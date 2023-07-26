import { useState } from 'react';
import { PaypalCheckoutProps } from '../../interfaces';
import { useNavigate } from "react-router-dom";
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';

export const PaypalCheckoutButton = (props: PaypalCheckoutProps) => {
    const navigate = useNavigate();

    const [paidFor, setPaidFor] = useState(false);
    const [error, setError] = useState('');

    const handleApprove = (_orderId: string) => {
        setPaidFor(true);
        localStorage.removeItem("cartValues");
    }

    if (paidFor) {
        navigate("/home", { state: { message: `Compra efetivada com sucesso! Total pago: R$ ${props.cartValues?.total.toFixed(2)}` } });
    }

    if (error) {
        alert(error);
    }

    return (
        <>
            <PayPalScriptProvider
                options={{
                    clientId: "ATO6XS3FKIAD_NsRT_ifveeAxIE1sXkSh97O69Sd1ucaW9z24VL1w61C2GsfhJ7fIkzBU6ERR-rCEglm",
                    currency: "BRL",
                }}
            >
                <PayPalButtons
                    onClick={(_data, actions) => {
                        const hasAlreadyBoughtCourse = false;
                        if (hasAlreadyBoughtCourse) {
                            setError("Erro");
                            return actions.reject();
                        } else {
                            return actions.resolve();
                        }
                    }}
                    createOrder={(_data, actions) => {
                        return actions.order.create({
                            purchase_units: [
                                {
                                    amount: {
                                        value: String(props.cartValues?.total.toFixed(1)),
                                    },
                                },
                            ],
                        });
                    }}
                    onApprove={async (data, action) => {
                        await action.order!.capture();
                        handleApprove(data.orderID);
                    }}
                    onError={() => {
                        setError("PayPal Checkout com erro.");
                    }}
                />
            </PayPalScriptProvider>
        </>
    );
};

