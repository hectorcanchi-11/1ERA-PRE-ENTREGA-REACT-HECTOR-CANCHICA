import { useEffect, useState } from 'react';
import {Link, useParams} from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {
    getFirestore,
    getDocs,
    where,
    query,
    collection,
} from "firebase/firestore"; 



export const ItemListContainer = () => {

    const [items,setItems]= useState ([])
    const [loading, setLoading] = useState(true)
    const {id}= useParams();

    useEffect(() => {
    const db = getFirestore();

const ref = !id ? collection(db, "items") : query(collection(db, "items") , where("category" , "==" , id ))

    getDocs(ref)
    .then((snapshot) => {
        setItems(
            snapshot.docs.map((doc) => {
                return { id: doc.id, ...doc.data()};
            })
        );
    })
    .finally(() => setLoading(false))
    }, [id])

//     useEffect(() => {
//         console.log(id) 
//         new Promise((resolve, reject) => setTimeout( resolve(data), 2000) )
//         .then((response) => {
//             if (!id) {
//             setItems(response);  

//     } else {
//     const filtered = response.filter((i) => (i.category) === id)
//     setItems(filtered);
// }
// })
            
//         .finally(() => setLoading(false));
//     }, [id])

    if(loading) return "wait";

    return (<Container className='mt-4 d-flex'>
        {items.map ( (i) => (
        <Card key={i.id} style={{ width: '200px' }}>
        <Card.Img variant="top" src={i.image}/>
        <Card.Body>
        <Card.Title>{i.nombre}</Card.Title>
        <Card.Text> {i.description}</Card.Text>
        <Card.Text> {i.category}</Card.Text>
        <Link to= {`/item/${i.id}`}> 
        <Button variant="primary">Ver Producto</Button>
        </Link>
        </Card.Body>
    </Card>
    ))}
    </Container>
    )}