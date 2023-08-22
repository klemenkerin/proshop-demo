import { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import axios from 'axios';

const HomeScreen = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const { data } = await axios.get('/api/products');
            setProducts(data); 
        }
        fetchProducts();
    }, []); // Empty array means it will run only once ([] is a dependency array, if it changes, it will run again)])

    return (
        <>
            <h1>Latest Products</h1>
            <Row>
                {products.map((product) => (
                    
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}> 
                        <Product product={product} />
                    </Col>
                ))}
            </Row>
        </>
    )
}

export default HomeScreen;