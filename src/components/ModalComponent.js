import React, { useState, useEffect } from 'react'
import { Modal, Header, Image, Button, Form, Card } from 'semantic-ui-react'
import { storage, db } from '../firebase'
import { addDoc, doc, getDoc, collection, serverTimestamp } from 'firebase/firestore'
import '../styles/addusercom.css'

const initialState = {
    name: '',
    title: '',
    email: '',
    info: '',
    contact: ''
}

const ModalComponent = ({ open, setOpen, handleDelete, id }) => {
    const [data, setData] = useState(initialState)
    const [expandInfo, setExpandInfo] = useState(false); // State to control info expansion
    const { name, title, email, info, contact, img } = data
    const [confirm, setConfirm] = useState(false)

    useEffect(() => {
        id && getSingleUSer();
    }, [id]);

    const getSingleUSer = async () => {
        const docRef = doc(db, 'users', id);
        console.log('id', docRef)
        const snapshot = await getDoc(docRef);
        if (snapshot.exists()) {
            setData({ ...snapshot.data() })
        }
    }

    const toggleInfoExpansion = () => {
        setExpandInfo(!expandInfo);
    }

    return (
        <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
        >
            <Modal.Header style={{ textAlign: 'center' }} >User Details</Modal.Header>
            {
                confirm ?
                    <>
                        <p style={{ display: 'flex', textAlign: 'center', alignItems: 'center', justifyContent: 'center',color:'red',fontSize:'18px',marginBottom:'5px' }}> Are you sure want to delete the  <b style={{marginLeft:'5px',marginRight:'5px'}}>{name}</b> user</p>
                        <Modal.Actions style={{ alignItems: 'center' }}>
                            <Button color='black' onClick={() => handleDelete(id)}>
                                Yes
                            </Button>
                            <Button color='red' Content="Delete" onClick={() => setConfirm(false)} >
                                No
                            </Button>
                        </Modal.Actions>
                    </>
                    :
                    <>
                        <Modal.Content image>
                            <Image Size='medium' src={img} wrapped />
                            <Modal.Description>
                                <Header>{name}</Header>
                                <p>{title}</p>
                                <p>{email}</p>
                                <p>{contact}</p>
                                {info.split('\n').slice(0, 8).map((line, index) => (
                                    <p key={index}>{line}</p>
                                ))}
                                {!expandInfo && info.split('\n').length > 8 && (
                                    <Button basic color='blue' onClick={toggleInfoExpansion}>Read More</Button>
                                )}
                                {expandInfo && (
                                    <>
                                        {info.split('\n').slice(8).map((line, index) => (
                                            <p key={index}>{line}</p>
                                        ))}
                                        <Button basic color='blue' onClick={toggleInfoExpansion}>Read Less</Button>
                                    </>
                                )}
                            </Modal.Description>
                        </Modal.Content>
                        <Modal.Actions>
                            <Button color='black' onClick={() => setOpen(false)}>
                                Cancel
                            </Button>
                            <Button color='red' Content="Delete" onClick={() => setConfirm(true)} >
                                Delete
                            </Button>
                        </Modal.Actions>
                    </>
            }
        </Modal>
    )
}

export default ModalComponent
