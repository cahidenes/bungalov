import React, { useState } from 'react';
import { Box, Typography, Link, IconButton, useTheme, useMediaQuery, Drawer, List, ListItem, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import LocationIcon from '@mui/icons-material/LocationOn';
import CommentsIcon from '@mui/icons-material/Comment';
import InstagramIcon from '@mui/icons-material/Instagram';
import PhoneIcon from '@mui/icons-material/Phone';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CabinIcon from '@mui/icons-material/Cabin';
import MenuIcon from '@mui/icons-material/Menu';
import { BUNGALOV_IDS, BUNGALOV_NAMES, bungalovs } from '../../config/bungalovs';

const Container = styled(Box)`
  height: 100vh;
  width: 100vw;
  position: relative;
  overflow: hidden;
`;

const TopBar = styled(Box)<{ $isMobile: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(8px);
  display: ${props => props.$isMobile ? 'none' : 'flex'};
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  z-index: 1000;
`;

const MobileTopBar = styled(Box)<{ $isMobile: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(8px);
  display: ${props => props.$isMobile ? 'flex' : 'none'};
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  z-index: 1000;
`;

const CompanyLogo = styled(Box)`
  display: flex;
  align-items: center;
  gap: 1rem;
  
  .logo-icon {
    font-size: 2rem;
    color: #ff931f;
  }
`;

const CompanyName = styled(Typography)`
  color: white;
  font-weight: 600;
  font-size: 1.4rem;
  text-shadow: 0 0 10px rgba(255,255,255,0.5);
`;

const NavItems = styled(Box)`
  display: flex;
  gap: 2rem;
  align-items: center;
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  transition: all 0.2s ease;
  
  &:hover {
    color: #ff931f;
    text-shadow: 0 0 10px rgba(255,255,255,0.3);
  }
`;

const NavigationDrawer = styled(List)`
  width: 250px;
  padding: 20px;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  height: 100%;
  color: white;

  .MuiListItem-root {
    padding: 12px;
    margin-bottom: 8px;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    gap: 12px;
    align-items: center;

    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
      transform: translateX(5px);
    }

    svg {
      width: 24px;
      height: 24px;
    }
  }

  .MuiListItemText-primary {
    color: white;
    font-size: 1.1rem;
  }
`;

const DrawerNavLink = styled(ListItem)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: white;
`;

const Header = styled(Box)`
  text-align: center;
  padding: 3rem 1rem;
  position: absolute;
  top: 60px;
  left: 0;
  right: 0;
  z-index: 2;
  background: linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 100%);
  
  h1 {
    color: #1e4d9e; 
    font-size: 3.5rem;
    margin-bottom: 1rem;
    text-shadow: 
      0 0 20px rgba(255,255,255,0.9),
      0 0 40px rgba(255,255,255,0.7),
      0 0 60px rgba(255,255,255,0.5);
  }
  
  h5 {
    color: #77471d; 
    font-weight: 500;
    font-size: 1.8rem;
    text-shadow: 
      0 0 35px rgba(255,255,255,1),
      0 0 60px rgba(255,255,255,1),
      0 0 85px rgba(255,255,255,1);
  }
`;

const BungalovsContainer = styled(Box)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  margin: 0 -1px;
`;

const Half = styled(Box)<{ isLeft?: boolean; isActive?: boolean }>`
  flex: 1;
  position: relative;
  cursor: pointer;
  overflow: hidden;
  transition: transform 0.3s ease;
  margin-right: ${props => props.isLeft ? '-7.2%' : '0'};
  margin-left: ${props => props.isLeft ? '0' : '-7.2%'};
  clip-path: ${props => props.isLeft 
    ? 'polygon(0 0, 100% 0, 75% 100%, 0 100%)'
    : 'polygon(25% 0, 100% 0, 100% 100%, 0 100%)'};
  z-index: ${props => props.isActive ? 1 : 0};

  &:hover {
    transform: scale(1.02);

    .explore-text {
      opacity: 1;
    }
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.4);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover::before {
    opacity: 1;
  }
`;

const BungalovImage = styled('div')<{ image: string }>`
  width: 100%;
  height: 100%;
  background-image: url(${props => props.image});
  background-size: cover;
  background-position: top center;
  object-fit: cover;
  object-position: top;
`;

const TextContainer = styled(Box)`
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  z-index: 1;
`;

const BungalovText = styled(Typography)`
  color: white;
  font-size: 2.5rem;
  font-weight: bold;
  opacity: 1;
  transition: all 0.3s ease;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  white-space: nowrap;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
  
  &.hidden {
    opacity: 0;
    transform: translate(-50%, -30%);
  }
`;

const ExploreText = styled(Typography)`
  color: white;
  font-size: 2rem;
  font-weight: bold;
  opacity: 0;
  transition: all 0.3s ease;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -70%);
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
  
  &.visible {
    opacity: 1;
    transform: translate(-50%, -50%);
  }
`;

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeHalf, setActiveHalf] = useState<'left' | 'right' | null>(null);

  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const navigationItems = [
    { 
      text: 'Konum',
      icon: <LocationIcon />,
      action: () => window.open('https://maps.app.goo.gl/kxWPGwMTJ9GZt6MG7', '_blank')
    },
    { 
      text: 'İletişim',
      icon: <PhoneIcon />,
      action: () => navigate('/contact')
    },
    { 
      text: 'Rezervasyon',
      icon: <CalendarMonthIcon />,
      action: () => {
        const bookingElement = document.getElementById('booking-section');
        if (bookingElement) {
          bookingElement.scrollIntoView({ behavior: 'smooth' });
        }
      }
    },
    { 
      text: 'Instagram',
      icon: <InstagramIcon />,
      action: () => window.open('https://instagram.com/sapancaturnabungalov', '_blank')
    },
    { 
      text: 'Yorumlar',
      icon: <CommentsIcon />,
      action: () => window.open('https://www.google.com/travel/search?gsas=1&ts=EggKAggDCgIIAxocEhoSFAoHCOgPEAwYARIHCOgPEAwYAhgBMgIQAA&qs=MhNDZ29JcC1tNnJwWGgyYkY1RUFFOAI&ap=ugEHcmV2aWV3cw&hl=tr-TR&ved=0CAAQ5JsGahcKEwjwo82P3P-JAxUAAAAAHQAAAAAQBQ', '_blank')
    }
  ];

  return (
    <Container>
      <TopBar $isMobile={isMobile}>
        <CompanyLogo>
          <CabinIcon className="logo-icon" />
          <CompanyName>
            Sapanca Turna Bungalov
          </CompanyName>
        </CompanyLogo>
        <NavItems>
          <NavLink 
            href="https://maps.app.goo.gl/kxWPGwMTJ9GZt6MG7" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <LocationIcon /> Konum
          </NavLink>
          <NavLink 
            onClick={(e) => {
              e.preventDefault();
              navigate('/contact');
            }}
            href="#"
          >
            <PhoneIcon /> İletişim
          </NavLink>
          <NavLink 
            onClick={(e) => {
              e.preventDefault();
              const bookingElement = document.getElementById('booking-section');
              if (bookingElement) {
                bookingElement.scrollIntoView({ behavior: 'smooth' });
              }
            }} 
            href="#booking"
          >
            <CalendarMonthIcon /> Rezervasyon
          </NavLink>
          <NavLink 
            href="https://instagram.com/sapancaturnabungalov" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <InstagramIcon /> Instagram
          </NavLink>
          <NavLink 
            href="https://www.google.com/travel/search?gsas=1&ts=EggKAggDCgIIAxocEhoSFAoHCOgPEAwYARIHCOgPEAwYAhgBMgIQAA&qs=MhNDZ29JcC1tNnJwWGgyYkY1RUFFOAI&ap=ugEHcmV2aWV3cw&hl=tr-TR&ved=0CAAQ5JsGahcKEwjwo82P3P-JAxUAAAAAHQAAAAAQBQ" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <CommentsIcon /> Yorumlar
          </NavLink>
        </NavItems>
      </TopBar>

      <MobileTopBar $isMobile={isMobile}>
        <IconButton onClick={handleDrawerToggle} style={{ color: 'white' }}>
          <MenuIcon />
        </IconButton>
        <CompanyName>
          Sapanca Turna Bungalov
        </CompanyName>
      </MobileTopBar>

      <Drawer
        anchor="left"
        open={isDrawerOpen}
        onClose={handleDrawerToggle}
        variant="temporary"
        sx={{
          '& .MuiDrawer-paper': {
            background: 'transparent',
            boxShadow: 'none',
            border: 'none'
          },
          '& .MuiBackdrop-root': {
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            backdropFilter: 'blur(5px)',
            '-webkit-backdrop-filter': 'blur(5px)'
          }
        }}
      >
        <NavigationDrawer>
          {navigationItems.map((item, index) => (
            <DrawerNavLink
              key={index}
              onClick={() => {
                item.action();
                handleDrawerToggle();
              }}
            >
              {item.icon}
              <ListItemText primary={item.text} />
            </DrawerNavLink>
          ))}
        </NavigationDrawer>
      </Drawer>

      <Header>
        <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
          Doğanın Kucağına Kaçış
        </Typography>
        <Typography 
          variant="h5" 
          component="h5" 
          sx={{ 
            color: '#ff931f',
            fontWeight: 500,
            fontSize: '1.8rem',
            textShadow: `
              0 0 35px rgba(0,0,0,1),
              0 0 60px rgba(0,0,0,1),
              0 0 85px rgba(0,0,0,1)
            `
          }}
        >
          Lüks ve Doğa Bir Arada
        </Typography>
      </Header>
      
      <BungalovsContainer>
        <Half
          isLeft
          isActive={activeHalf === 'left'}
          onClick={() => navigate(`/bungalov/${BUNGALOV_IDS.FIRST}`)}
          onMouseEnter={() => setActiveHalf('left')}
          onMouseLeave={() => setActiveHalf(null)}
        >
          <BungalovImage image={bungalovs[BUNGALOV_IDS.FIRST].mainImage} />
          <TextContainer>
            <BungalovText className={activeHalf === 'left' ? 'hidden' : ''}>
              {BUNGALOV_NAMES[BUNGALOV_IDS.FIRST]}
            </BungalovText>
            <ExploreText className={activeHalf === 'left' ? 'visible' : ''}>
              Keşfet →
            </ExploreText>
          </TextContainer>
        </Half>
        <Half
          isActive={activeHalf === 'right'}
          onClick={() => navigate(`/bungalov/${BUNGALOV_IDS.SECOND}`)}
          onMouseEnter={() => setActiveHalf('right')}
          onMouseLeave={() => setActiveHalf(null)}
        >
          <BungalovImage image={bungalovs[BUNGALOV_IDS.SECOND].mainImage} />
          <TextContainer>
            <BungalovText className={activeHalf === 'right' ? 'hidden' : ''}>
              {BUNGALOV_NAMES[BUNGALOV_IDS.SECOND]}
            </BungalovText>
            <ExploreText className={activeHalf === 'right' ? 'visible' : ''}>
              Keşfet →
            </ExploreText>
          </TextContainer>
        </Half>
      </BungalovsContainer>
    </Container>
  );
};

export default LandingPage;
