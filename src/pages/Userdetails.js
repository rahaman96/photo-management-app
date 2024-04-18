import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';

import { Container, Image, Button, Header, Segment, Grid } from 'semantic-ui-react';

import { storage, db } from '../firebase'
import { addDoc, doc, getDoc, collection, serverTimestamp } from 'firebase/firestore'
const initialState = {
    name: '',
    title: '',
    email: '',
    info: '',
    contact: ''
}

const Userdetails = () => {
    const [data, setData] = useState(initialState)
    const [showAllInfo, setShowAllInfo] = useState(false);
    const { id } = useParams();
    console.log('userdata', data)
    const { name, title, email, info, contact, img } = data
    const navigate = useNavigate()
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

    const handleReadMore = () => {
        setShowAllInfo(true);
    };
    const handleReadLess = () => {
        setShowAllInfo(false);
    };
    return (

        <Container style={{ marginTop: '2em' }}>
            <Header as="h1" textAlign="center">User Details</Header>
            <Grid centered stackable>
                <Grid.Column width={6} textAlign="center">
                    <Segment>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Image src={img} size='medium' rounded centered />
                        </div>
                    </Segment>
                </Grid.Column>
                <Grid.Column width={8}>
                    <Segment style={{ display: 'flex', alignItems: 'center' }}>
                        <Header as="h3" style={{ marginRight: '5px', marginBottom: '0' }}>Name:</Header>
                        <p style={{ marginBottom: '0', fontSize: '18px' }}>{name}</p>
                    </Segment>
                    <Segment style={{ display: 'flex', alignItems: 'center' }}>
                        <Header as="h3" style={{ marginRight: '5px', marginBottom: '0' }}>Title:</Header>
                        <p style={{ marginBottom: '0' }}>{title}</p>
                    </Segment>

                    <Segment style={{ display: 'flex', alignItems: 'center' }}>
                        <Header as="h3" style={{ marginRight: '5px', marginBottom: '-4px' }}>Email:</Header>
                        <p style={{ marginBottom: '0', fontSize: '18px' }}>{email}</p>
                    </Segment>
                    <Segment style={{ display: 'flex', alignItems: 'center' }}>
                        <Header as="h3" style={{ marginRight: '5px', marginBottom: '0' }}>Contact:</Header>
                        <p style={{ marginBottom: '0', fontSize: '18px' }}>{contact}</p>
                    </Segment>
                    <Segment>
                        <Header as="h3">Info:</Header>
                        <p style={{ maxHeight: showAllInfo ? 'none' : '120px', overflow: 'hidden' }}>{info}</p>
                        {showAllInfo ? (
                            <Button onClick={handleReadLess} primary>Read Less</Button>
                        ) : (
                            <Button onClick={handleReadMore} primary>Read More</Button>
                        )}
                    </Segment>
                </Grid.Column>
            </Grid>
            <Button primary onClick={() => navigate('/gallary')} style={{ marginTop: '1em' }}>Back</Button>
        </Container>


    )
}

export default Userdetails