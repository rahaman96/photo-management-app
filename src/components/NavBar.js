// import React from 'react'
// import { useNavigate, Link } from 'react-router-dom'
// import { Button, Container, Image, Menu } from 'semantic-ui-react'
// import { IoMdHome } from "react-icons/io";
// const NavBar = () => {
//   const navigate = useNavigate()
//   return (
//     <Menu inverted borderless style={{ padding: '0.3rem', marginBottom: '20px', marginTop: '0px' }}>
//       <Container>
//         <Menu.Item name='home'>
//           <Link to="/" Size="large" >
//             <IoMdHome style={{ width: '25px', height: '25px' }} />
//             {/* <Image Size="mini" src={Logo} alt="Logo"/> */}
//           </Link>
//         </Menu.Item>
//         <Menu.Item extra position='right'>
//           <div>
//             <Button size="mini" primary onClick={() => navigate('/gallary')} >Gallary</Button>
//             <Button size="mini" primary onClick={() => navigate(`/add`)} >Add User</Button>
//           </div>
//         </Menu.Item>
//       </Container>
//     </Menu>
//   )
// }

// export default NavBar

import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Button, Container, Menu } from 'semantic-ui-react'
import { IoMdHome } from "react-icons/io";

const NavBar = ({item,id}) => {
  const [activeItem, setActiveItem] = useState('gallary');
  const navigate = useNavigate();

  const handleItemClick = (e, { name }) => setActiveItem(name);

  return (
    <Menu inverted borderless style={{ padding: '0.3rem', marginBottom: '20px', marginTop: '0px' }}>
      <Container>
        <Menu.Item name='home' >
          <Link to="/" Size="large" >
            <IoMdHome style={{ width: '25px', height: '25px' }} />
          </Link>
        </Menu.Item>

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Menu.Item
            name='gallary'
            active={activeItem === 'gallary'}
            onClick={() => {
              handleItemClick(null, { name: 'gallary' });
              navigate('/gallary');
            }}
            textAlign='center'
            style={{ margin: 'auto' }}
          />
          
          <Menu.Item
            name='userdetails'
            active={activeItem === 'userdetails'}
            onClick={handleItemClick}
            style={{ margin: 'auto' }}
          />
        </div>

        <Menu.Item extra position='right'>
          <div>
            <Button size="mini" primary onClick={() => navigate(`/add`)} >Add User</Button>
          </div>
        </Menu.Item>
      </Container>
    </Menu>
  );
}

export default NavBar;
