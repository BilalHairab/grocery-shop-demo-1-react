import { DeliveryMethods, DeliveryOption, OrderState, PaymentMethods, PaymentOption } from '@/reducers/order/orderReducer.types';
import { activeOrderSelector } from "@/reducers/order/orderSelectors";
import { useCallback, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import orderActions from '@/reducers/order/orderActions';
import usePaymentHook from './usePaymentHook';
import { CartItemCounter } from '@/reducers/cart/cartReducer.types';
import cartActions from '@/reducers/cart/cartActions';

const useCurrentOrder = () => {
    const paymentHook = usePaymentHook();
    const activeOrder = useSelector(activeOrderSelector);
    const dispatch = useDispatch()
    const paymentMethods = useRef(PaymentMethods)
    const deliveryMethods = useRef(DeliveryMethods)
    const [availableDeliveryMethods, setAvailableDeliveryMethods] = useState([...deliveryMethods.current])
    const [availablePaymentMethods, setAvailablePaymentMethods] = useState([...paymentMethods.current])
    const [error, setError] = useState<string | undefined>(undefined);

    const calculateTotalAmount = useCallback(() => {
        if(activeOrder === undefined) {
            return 0.0;
        }
        const items: CartItemCounter[] = Object.values(activeOrder.cart);
        let total = 0;
        for (const item of items) {
          total += (item.count * item.item.price)
        }
        total += activeOrder.delivery?.fees ?? 0;
        total += activeOrder.payment?.fees ?? 0;
        return total;
    }, [activeOrder]);
    
    const startOrder = (items: CartItemCounter[]) => {
        dispatch(orderActions.initActiveOrder(items))
    }

    const startDelivery = () => {
        if(activeOrder?.delivery?.key === "no") {
            dispatch(orderActions.updateActiveOrderState(OrderState.DELIVERED))
        } else {
            dispatch(orderActions.updateActiveOrderState(OrderState.IN_DELIVERY))
        }
    }

    const pay = () => {
        if(activeOrder?.delivery?.key === "no") {
            dispatch(orderActions.updateActiveOrderState(OrderState.FINISHED))
            notifyFinished()
            dispatch(cartActions.clearCart())
            return
        }
        if(activeOrder?.payment?.key === "cod") {
            dispatch(orderActions.updateActiveOrderState(OrderState.IN_DELIVERY))
            dispatch(cartActions.clearCart())
            return
        }
        paymentHook.cardPay(Number(calculateTotalAmount().toFixed(2)), (message: string) => {
            dispatch(cartActions.clearCart())
            dispatch(orderActions.updateActiveOrderState(OrderState.PAID))
        }, (errorMessage: string) => {
            setError(errorMessage);
        });
    }

    const notifyDelivered = () => {
        dispatch(orderActions.updateActiveOrderState(OrderState.DELIVERED))
        notifyFinished()
        dispatch(cartActions.clearCart())
    }

    const notifyFinished = () => {
        dispatch(orderActions.finishOrder())
    }
    const setPayment = (paymentKey?: string) => {
        const payment = availablePaymentMethods.find((item: PaymentOption) => item.key === paymentKey);
        dispatch(orderActions.setOrderPayment(payment));
    }

    const setDelivery = (deliveryKey: string) => {
        const delivery = availableDeliveryMethods.find((item: DeliveryOption) => item.key === deliveryKey);
        if(delivery === undefined) {
            setError("Invalid delivery method")
            return;
        }
        dispatch(orderActions.setOrderDelivery(delivery));
        if(delivery.key === "no") {
            setPayment(undefined)
            setAvailablePaymentMethods([]);
        } else {
            setAvailablePaymentMethods([...paymentMethods.current]);
        }
    }

    return {
        activeOrder,
        startOrder,
        startDelivery,
        notifyDelivered,
        notifyFinished,
        setDelivery,
        setPayment,
        pay,
        total: calculateTotalAmount(),
        error,
        availableDeliveryMethods,
        availablePaymentMethods
    }
}

export default useCurrentOrder;