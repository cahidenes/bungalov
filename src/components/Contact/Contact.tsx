import React from 'react';
import { Box, Typography, Link, Container } from '@mui/material';
import styled from '@emotion/styled';
import PhoneIcon from '@mui/icons-material/Phone';
import InstagramIcon from '@mui/icons-material/Instagram';
import PersonIcon from '@mui/icons-material/Person';

const ContactContainer = styled(Container)`
  min-height: 100vh;
  min-width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: linear-gradient(155deg, rgba(255, 239, 201,0.35), rgba(110, 198, 230,0.25));

`;

const ContactCard = styled(Box)`
  background: white;
  padding: 3rem;
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  width: 100%;
`;

const ContactItem = styled(Box)`
  display: flex;
  align-items: center;
  margin: 1.5rem 0;
  padding: 1rem;
  border-radius: 12px;
  background: #f8f9fa;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
  }

  .MuiSvgIcon-root {
    font-size: 2rem;
    margin-right: 1rem;
    color: #1976d2;
  }
`;

const InstagramSection = styled(Box)`
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #e0e0e0;
  text-align: center;
`;

const Contact = () => {
  return (
    <ContactContainer>
      <ContactCard>
        <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ fontWeight: 600, color: '#1976d2' }}>
          İletişim
        </Typography>
        
        <ContactItem>
          <PersonIcon />
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              İsim
            </Typography>
            <Typography variant="body1">
              Berat Turna
            </Typography>
          </Box>
        </ContactItem>

        <ContactItem>
          <PhoneIcon />
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              Telefon
            </Typography>
            <Link 
              href="tel:+905392744906" 
              sx={{ 
                textDecoration: 'none', 
                color: 'inherit',
                '&:hover': { color: '#1976d2' }
              }}
            >
              <Typography variant="body1">
                0 539 274 49 06
              </Typography>
            </Link>
          </Box>
        </ContactItem>

        <InstagramSection>
          <Typography variant="body1" gutterBottom>
            DM ile de ulaşabilirsiniz
          </Typography>
          <Link
            href="https://instagram.com/sapancaturnabungalov"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              textDecoration: 'none',
              color: '#1976d2',
              '&:hover': {
                color: '#1565c0'
              }
            }}
          >
            <InstagramIcon sx={{ mr: 1 }} />
            <Typography variant="body1">
              @sapancaturnabungalov
            </Typography>
          </Link>
        </InstagramSection>
      </ContactCard>
    </ContactContainer>
  );
};

export default Contact;
