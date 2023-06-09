import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useContext } from 'react';
import {NavbarComp} from '../components/Navbar';
import {Container, Button, Table} from 'react-bootstrap';
import pizzadatabase from '../components/Pizzas';
import  Context  from "../context";

    const Carrito = () => {
    const pizzas = pizzadatabase;
    const { cart, setCart } = useContext(Context);      
    const formatPeso = (number) => {
        return new Intl.NumberFormat("es-CL", {
            style: "currency",
            currency: "CLP",
            minimumFractionDigits: 0,
        }).format(number);
    }  

    const calcularTotal = () => {
        let total = 0;
        cart.forEach((item) => {
            const pizza = pizzas.find((p) => p.id === item.id);
            total += pizza.price * item.cantidad;
        });
        return total;
    };     
    
    const addToCart = (id) => {
        const productoExistente = cart.find((p) => p.id === id);
        if (productoExistente) {
            const nuevosProductos = cart.map((p) =>
            p.id === id ? { ...p, cantidad: p.cantidad + 1 } : p
        );
            setCart(nuevosProductos);
        } else {
        const producto = pizzas.find((p) => p.id === id);
        if (producto) {
        setCart([...cart, { id, cantidad: 1 }]);
        }
    }
    };
    
    const removeFromCart = (id) => {
        const productoExistente = cart.find((p) => p.id === id);
        if (productoExistente && productoExistente.cantidad > 1) {
            const nuevosProductos = cart.map((p) =>
            p.id === id ? { ...p, cantidad: p.cantidad - 1 } : p
        );
            setCart(nuevosProductos);
        } else {
            const nuevosProductos = cart.filter((p) => p.id !== id);
            setCart(nuevosProductos);
        }
    };
    return (        
        <>           
            <NavbarComp/>       
            <Container style = {{ display: 'flex'}} className="back">
                <h1 className="my-4">Carro de compras</h1>
                <Table striped bordered hover>
                    <thead><tr><th>Producto</th><th>Precio</th><th>Cantidad</th><th>Subtotal</th><th>Acciones</th></tr>
                    </thead>
                    <tbody>
                        {cart.map((item) => {
                        const pizza = pizzas.find((p) => p.id === item.id);
                        return (
                            <tr key={item.id}><td>{pizza.name}</td><td>{formatPeso(pizza.price)}</td><td>{item.cantidad}</td><td>{formatPeso(pizza.price * item.cantidad)}</td><td>
                                <Button variant="primary" onClick={() => addToCart(item.id)}>
                                +
                                </Button>{" "}
                                <Button variant="danger" onClick={() => removeFromCart(item.id)}>
                                -
                                </Button>
                                </td>
                                </tr>
                                );
                                })}
                    </tbody>
                    <tfoot><tr><td colSpan="3">Total:</td><td>{formatPeso(calcularTotal())}</td></tr>
                    <br></br>
                    <button type="button" class="btn btn-success">Ir al Pago!!!</button>
                    </tfoot>
                </Table>                                 
            </Container>                
        </>
    );
}
export default Carrito;