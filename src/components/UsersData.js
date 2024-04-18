

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { db } from '../firebase'
import { Container, Grid, Card, Image, Button } from 'semantic-ui-react'
import { collection, onSnapshot, doc, deleteDoc } from 'firebase/firestore'
import ModalComponent from './ModalComponent'
import { toast } from 'react-toastify'
import '../styles/userData.css';
const UsersData = () => {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)
    const [user, setUser] = useState({})
    const [id, setId] = useState()
    const [columns, setColumns] = useState(calculateColumns()) // Initial state based on current width
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true)
        const unsub = onSnapshot(collection(db, 'users'), (snapshot) => {
            let list = [];
            snapshot.docs.forEach((doc) => {
                list.push({ id: doc.id, ...doc.data() })
            });
            setUsers(list);
            setLoading(false)
        }, (error) => {
            console.log('error', error)
        });

        // Event listener for window resize
        const handleResize = () => {
            setColumns(calculateColumns()); // Update columns state based on new width
        };
        window.addEventListener('resize', handleResize);

        return () => {
            unsub();
            window.removeEventListener('resize', handleResize); // Remove event listener on cleanup
        }
    }, [])

    const handleModal = (item) => {
        setOpen(true)
        setUser(item)
        setId(item.id)
    }

    const handleDelete = async (id) => {
        const docRef = doc(db, 'users', id);
        await deleteDoc(docRef);
        toast.success("Succesfully deleted")
        setOpen(false)
    }

    function calculateColumns() {
        // Calculate the number of columns based on the screen width
        const screenWidth = window.innerWidth;
        if (screenWidth >= 992) { // Large devices
            return 4; // Display 4 cards
        } else if (screenWidth >= 768 && screenWidth < 992) { // Tablet devices
            return 3; // Display 3 cards
        } else { // Mobile devices
            return 1; // Display 1 card
        }
    }

    return (
        <Container >
            <Card.Group centered >
                <Grid columns={columns} stackable className="grid">
                    {users && users.map((item) => (
                        <Grid.Column key={item.id} className="grid-container">
                            <Card className="grid-con card-container">
                                <Card.Content>
                                    <Image
                                        src={item.img}
                                        alt='image'
                                        size='medium'
                                        style={{
                                            height: "150px",
                                            width: '150px',
                                            marginBottom: '15px',
                                            cursor: 'pointer'
                                        }}
                                        onClick={() => navigate(`/userdetails/${item.id}`)}
                                    />
                                    <Card.Header className='card-header'>{item.name}</Card.Header>
                                    <Card.Description className='card-title'>{item.title}</Card.Description>
                                    <Card.Description className="card-description">{item.info}</Card.Description>
                                   
                                </Card.Content>
                                <Card.Content extra>
                                    <div>
                                        <Button color='green' onClick={() => navigate(`/update/?id=${item.id}`)}>
                                            Update
                                        </Button>
                                        <Button color='purple' onClick={() => handleModal(item)}>
                                            View
                                        </Button>
                                        {open && (
                                            <ModalComponent
                                                open={open}
                                                setOpen={setOpen}
                                                id={id}
                                                handleDelete={handleDelete}
                                            />
                                        )}
                                    </div>
                                </Card.Content>
                            </Card>
                        </Grid.Column>
                    ))}
                </Grid>

            </Card.Group>
            <Button style={{ marginTop: '50px' }} onClick={() => navigate('/')}>Back</Button>
        </Container>
    )
}

export default UsersData
