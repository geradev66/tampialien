import { useEffect, useRef } from 'react';
import { createPayPalOrder, capturePayPalOrder } from '../service/checkOutService';
import { useCartStore } from '../store/useCartStore';
import Swal from 'sweetalert2';

declare global {
  interface Window {
    paypal: any;
  }
}

const PayPalButton = () => {
  const clearCart = useCartStore((s) => s.clearCart);
  const ref = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<any[]>([]);

  useEffect(() => {
    if (!ref.current || !window.paypal) return;

    const container = ref.current;
    let active = true;

    window.paypal.Buttons({
      createOrder: async () => {
        if (!localStorage.getItem('token')) {
          Swal.fire({
            title: 'Inicia sesión',
            text: 'Debes iniciar sesión para poder comprar.',
            icon: 'warning',
            confirmButtonText: 'Iniciar sesión',
            confirmButtonColor: '#3085d6',
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.href = '/login';
            }
          });
          throw new Error('Not authenticated');
        }
        const data = await createPayPalOrder();
        if (data.error) {
          Swal.fire({
            title: 'Error al crear la orden',
            text: data.message || 'Intenta de nuevo más tarde.',
            icon: 'error',
            confirmButtonText: 'OK',
          });
          throw new Error(data.error);
        }
        return data.id;
      },
      onApprove: async (data: { orderID: string }) => {
        const res = await capturePayPalOrder(data.orderID);
        if (res.error) {
          const detail = res.details?.[0]?.description || res.message || 'Error al procesar el pago';
          Swal.fire({
            title: 'Error en el pago',
            text: detail,
            icon: 'error',
            confirmButtonText: 'Intentar de nuevo',
          });
          return;
        }
        clearCart();
        window.location.href = '/order-success';
      },
      onError: () => {
        Swal.fire({
          title: 'Error en el pago',
          text: 'Ocurrió un error inesperado con PayPal. Intenta de nuevo.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      },
    }).render(container).then((btn: any) => {
      if (!active) {
        btn.close();
        return;
      }
      buttonsRef.current.push(btn);
    });

    return () => {
      active = false;
      buttonsRef.current.forEach((btn) => btn?.close());
      buttonsRef.current = [];
    };
  }, []);

  return <div ref={ref} />;
};

export default PayPalButton;
