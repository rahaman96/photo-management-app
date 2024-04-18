import React, { useEffect, useState } from 'react'
import { storage, db } from '../firebase'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { onSnapshot } from 'firebase/firestore'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { Grid, Loader, Form, Button,TextArea } from 'semantic-ui-react'
import { addDoc, doc, getDoc, collection, serverTimestamp } from 'firebase/firestore'
import { toast } from 'react-toastify'
import '../styles/userData.css'
import '../styles/addusercom.css'
const initialState = {
    name: '',
    title: '',
    email: '',
    info: '',
    contact: ''
}
const AddEditUserCom = () => {
    const [data, setData] = useState(initialState)
    const { name, title, email, info, contact, img } = data
    const [file, setFile] = useState()
    const [progress, setProgress] = useState(null)
    const [errors, setErrors] = useState({})
    const [isSubmit, setIsSubmit] = useState(false)
    const [users, setUsers] = useState([])


    const [id, setId] = useState('');

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);

        const idValue = params.get('id');
        if (idValue) {
            setId(idValue);
        } else {
            setId('')
        }
        // Set id state
    }, [window.location.search]);

    const Navigate = useNavigate()

    useEffect(() => {
        if (id) {
            getSingleUSer()
        } else {
            setData(initialState)
        }
    }, [id]);

    console.log('usersdata', users)
    const getSingleUSer = async () => {
        if (id) {
            const docRef = doc(db, 'users', id);
            console.log('id', docRef)
            const snapshot = await getDoc(docRef);
            if (snapshot.exists()) {
                setData({ ...snapshot.data() })
            }
        } else {
            setData(initialState)
        }

    }
    console.log('getSingleUSer', getSingleUSer)
    useEffect(() => {
        const uploadFile = () => {
            const name = new Date().getTime() + file.name;
            const storageRef = ref(storage, file.name);
            const uploadTask = uploadBytesResumable(storageRef, file)
            uploadTask.on("state_changed", (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setProgress(progress);
                switch (snapshot.state) {
                    case 'paused':
                        console.log('upload is pause');
                        break;
                    case 'running':
                        console.log("upload is running");
                        break;
                    default:
                        break

                }
            }, (error) => {
                console.log('error', error);
            },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setData((prev) => ({ ...prev, img: downloadURL }))
                    })
                }
            )
        };
        file && uploadFile()

    }, [file])


    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const validate = () => {
        let errors = {};
        if (!name) {
            errors.name = 'Name is Required'
        }
        if (!title) {
            errors.title = 'Title Is Required'
        }
        if (!email) {
            errors.email = 'Email is required'
        }

        if (!info) {
            errors.info = 'Info is required'
        }
        if (!contact) {
            errors.contact = 'Contact is Required'
        }
        return errors
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        let errors = validate();
        if (Object.keys(errors).length) return setErrors(errors);
        setIsSubmit(true);
        await addDoc(collection(db, 'users'), {
            ...data,
            timestamp: serverTimestamp()
        })
        if (id) {
            toast.success("Update Succesfull")

        } else {
            toast.success("Add Succesfull")

        }
        Navigate('/gallary')
    }

    return (
        <Grid
            centered
            verticalAlign='middle'
            columns='3'
            style={{ hight: '80vh' }}
        >
            <Grid.Row >
                <Grid.Column  mobile={10} tablet={8} computer={5}>
                    <div>
                        {isSubmit ? (<Loader active inline='centered' size='huge' />
                        ) : (
                            <>
                                <h2 className='add-user' textAlign='center'>{id ? 'Update' : 'Add'} User</h2>
                                <Form onSubmit={handleSubmit} style={{}} >
                                    <Form.Input className='full-width-input'
                                        label='Name'
                                        placeholder='Enter Name'
                                        name='name'
                                        onChange={handleChange}
                                        value={name}
                                        // defaultValue={users.name}
                                        error={errors.name ? { content: errors.name } : null}
                                        autoFocus

                                    />
                                    <Form.Input className='full-width-input'
                                        label='Title'
                                        placeholder='Enter Title'
                                        name='title'
                                        onChange={handleChange}
                                        value={title}
                                        // defaultValue={users.name}
                                        error={errors.title ? { content: errors.title } : null}
                                        autoFocus

                                    />
                                    <Form.Input
                                        label='Email'
                                        placeholder='Enter Email'
                                        name='email'
                                        onChange={handleChange}
                                        value={email}
                                        error={errors.email ? { content: errors.email } : null}
                                        autoFocus
                                    />

                                    <TextArea className='text-area'  style={{ marginBottom: '10px' }}
                                        label='Info'
                                        placeholder='Tell us more'
                                        name='info'
                                        onChange={handleChange}
                                        value={info}
                                        error={errors.info ? { content: errors.info } : null}
                                        autoFocus
                                    />
                                    <Form.Input className='contact'
                                        label='Contact'
                                        placeholder='Enter Contact'
                                        name='contact'
                                        onChange={handleChange}
                                        value={contact}
                                        error={errors.contact ? { content: errors.contact } : null}
                                        autoFocus
                                    />
                                    <div>
                                        <img src={img} height={150} alt='profile' />
                                    </div>
                                    <Form.Input
                                        // label='upload'
                                        type="file"
                                        onChange={(e) => setFile(e.target.files[0])}

                                    />
                                    <Button
                                        primary
                                        type='submit'
                                        disabled={progress !== null && progress < 100}
                                    >
                                       {id?'Update':' Submit'}
                                    </Button>
                                </Form>
                            </>
                        )}
                    </div>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}

export default AddEditUserCom