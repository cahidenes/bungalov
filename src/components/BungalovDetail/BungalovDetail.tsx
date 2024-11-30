import React, { useState, useEffect } from 'react';
import { Box, Button, Container, Typography, IconButton, Link, Modal, TextField, Paper, FormControlLabel, Checkbox, useTheme, useMediaQuery, Drawer, List, ListItem, ListItemText } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { tr } from 'date-fns/locale';
import styled from '@emotion/styled';
import { useNavigate, useParams } from 'react-router-dom';
import { BUNGALOV_IDS, bungalovs } from '../../config/bungalovs';
import InstagramIcon from '@mui/icons-material/Instagram';
import CommentsIcon from '@mui/icons-material/Comment';
import LocationIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CabinIcon from '@mui/icons-material/Cabin';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import CloseIcon from '@mui/icons-material/Close';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import MenuIcon from '@mui/icons-material/Menu';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { bookingConfig, terms } from '../../config/bookings';
import { prices } from '../../config/prices';

// Types for our features
interface Feature {
  id: string;
  title: string;
  description: string;
  image: string;
}

interface BungalovData {
  id: string;
  name: string;
  description: string;
  features: Feature[];
}

const DetailContainer = styled(Box)`
  min-height: 100vh;
  background: #f5f5f5;
  overflow: hidden;
`;

const Description = styled(Typography)`
  margin-top: 80px;
  margin-bottom: 40px;
  text-align: center;
  padding: 3rem;
  font-size: 1.2rem;
  color: #2c3e50;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  background: linear-gradient(155deg, rgba(255, 239, 201,0.35), rgba(110, 198, 230,0.25));
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.25);
  backdrop-filter: blur(10px);
  line-height: 1.8;
  font-weight: 400;
  border: 1px solid rgba(0,0,0,0);
`;

const DesktopTopBar = styled(Box)<{ $isMobile: boolean }>`
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

const BungalovSwitch = styled(Button)`
  margin-left: 1rem;
  color: white;
  border-color: rgba(255, 255, 255, 0.7);
  text-transform: none;
  font-size: 0.9rem;
  padding: 0.3rem 1rem;
  
  &:hover {
    border-color: white;
    background: rgba(255, 255, 255, 0.1);
  }
`;

const FeaturesContainer = styled(Box)`
  margin: 0;
  padding: 0;
  width: 100%;
`;

const FeatureSection = styled(Box)<{ isReversed?: boolean }>`
  display: flex;
  flex-direction: ${props => props.isReversed ? 'row-reverse' : 'row'};
  align-items: stretch;
  min-height: 600px;
  width: 100%;
  position: relative;
  overflow: hidden;
  background-size: cover;
  background-position: center;
  background-attachment: fixed;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: inherit;
    filter: blur(10px);
    transform: scale(1.1);
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${props => props.isReversed
      ? 'linear-gradient(to left, rgba(0,0,0,0.0), rgba(0,0,0,0.5))'
      : 'linear-gradient(to right, rgba(0,0,0,0.0), rgba(0,0,0,0.5))'
    };
  }

  @media (max-width: 900px) {
    flex-direction: column;
    min-height: auto;
  }
`;

const FeatureImageContainer = styled(Box)<{ isReversed?: boolean }>`
  flex: 1;
  position: relative;
  overflow: hidden;
  clip-path: ${props => props.isReversed
    ? 'polygon(10% 0, 100% 0, 100% 100%, 0 100%)'
    : 'polygon(0 0, 90% 0, 100% 100%, 0 100%)'
  };
  min-width: 58%;
  z-index: 2;
  background-color: #f0f0f0;

  @media (max-width: 900px) {
    min-height: 400px;
    clip-path: polygon(0 0, 100% 0, 100% 85%, 0 100%);
  }
`;

const FeatureImage = styled(Box)`
  width: 100%;
  height: 100%;
  position: absolute;
  background-size: cover;
  background-position: center;
  transition: transform 0.3s ease;
  will-change: transform;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transform: scale(1.0);
    transition: transform 0.3s ease;
    will-change: transform;
  }

  &:hover {
    img {
      transform: scale(1.05);
    }
  }
`;

const FeatureContent = styled(Box)<{ isReversed?: boolean }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 4rem;
  position: relative;
  z-index: 1;
  color: white;

  h2 {
    font-size: 2.5rem;
    margin-bottom: 1.5rem;
    font-weight: 600;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
  }

  p {
    font-size: 1.2rem;
    line-height: 1.6;
    opacity: 0.9;
    text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
  }

  @media (max-width: 900px) {
    padding: 3rem 2rem;
  }
`;

const CarouselContainer = styled(Box)`
  margin: 40px auto;
  max-width: 1200px;
  padding: 0 20px;
  position: relative;

  .slick-slide {
    padding: 0 10px;
  }

  .slick-track {
    display: flex;
    align-items: center;
  }

  &:hover .carousel-arrow {
    opacity: 1;
  }
`;

const CarouselArrow = styled(IconButton)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
  background: rgba(0, 0, 0, 0.5) !important;
  color: white !important;
  opacity: 0;
  transition: opacity 0.3s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.7) !important;
  }

  &.prev {
    left: 0;
  }

  &.next {
    right: 0;
  }
`;

const MediaItem = styled(Box)`
  position: relative;
  aspect-ratio: 16/9;
  overflow: hidden;
  border-radius: 10px;
  cursor: pointer;
  transition: transform 0.3s ease;
  background-color: #f0f0f0;

  &:hover {
    transform: scale(1.02);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transform: scale(1.0);
    transition: transform 0.3s ease;
    will-change: transform;
  }

  &:hover img {
    transform: scale(1.1);
  }
`;

const FullscreenModal = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(5px);

  .modal-content {
    max-width: 90vw;
    max-height: 90vh;
    position: relative;
    outline: none;
  }

  img, video {
    max-width: 100%;
    max-height: 90vh;
    object-fit: contain;
    border-radius: 4px;
  }

  .close-button {
    position: absolute;
    top: -40px;
    right: 0;
    color: white;
    background: rgba(0, 0, 0, 0.5);
    
    &:hover {
      background: rgba(0, 0, 0, 0.7);
    }
  }
`;

const BookingSection = styled(Box)`
  margin: 32px auto;
  padding: 24px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  background: linear-gradient(155deg, rgba(255, 239, 201,0.45), rgba(110, 198, 230,0.35));
  width: 90%;
  max-width: 800px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.25);

  @media (max-width: 600px) {
    width: 95%;
    padding: 16px;
    margin: 16px auto;
  }
`;

const BookingContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 24px;

  @media (max-width: 600px) {
    gap: 16px;
  }
`;

const BookingContent = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 24px;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    gap: 16px;
  }
`;

const BookingInfo = styled(Box)`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const BookingDetails = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 16px;
  background:
`;

const BookingActions = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-left: 48px;
  padding-right: 48px;

  @media (max-width: 768px) {
    padding-left: 16px;
    padding-right: 16px;
  }
`;

const DateDisplayContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding: 16px;
`;

const DateInfo = styled(Box)`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #333;
  font-size: 1rem;
`;

const DayCountInfo = styled(Box)`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #333;
  font-size: 1rem;
`;

const TotalCostInfo = styled(Box)`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #333;
  font-weight: 500;
  font-size: 1.125rem;
`;

const CalendarContainer = styled(Box)`
  border-radius: 8px;
  padding: 16px;
  display: flex;
  justify-content: center;

  .MuiPickersCalendarHeader-root {
    margin-top: 0;
    padding: 0 8px;
    margin-bottom: 16px;
    background: transparent;
  }

  .MuiPickersCalendarHeader-label {
    font-size: 1rem;
    font-weight: 500;
    color: #1976d2;
  }

  .MuiDayCalendar-header {
    margin-bottom: 8px;
    background: transparent;
    padding: 0;
    display: flex;
    justify-content: space-between;
  }

  .MuiDayCalendar-weekDayLabel {
    color: #666;
    font-weight: 500;
    width: 40px;
    height: 32px;
    margin: 0;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .MuiDayCalendar-monthContainer {
    padding: 0;
    margin: 0;
    min-height: 240px;
    background: transparent;
  }

  .MuiDayCalendar-weekContainer {
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: space-between;
    min-height: 32px;
    background: transparent;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);

    &:last-child {
      border-bottom: none;
    }
  }

  .MuiPickersDay-root {
    width: 40px;
    height: 32px;
    margin: 0;
    padding: 0;
    font-size: 0.875rem;
    color: #333;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: none;
    border-right: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 0;
    cursor: pointer;

    &:hover:not(.Mui-selected):not(.unavailable) {
      background-color: rgba(25, 118, 210, 0.1);
    }

    &.Mui-selected {
      background-color: #1976d2 !important;
      color: #fff !important;
      font-weight: 500;

      &:hover {
        background-color: #1565c0 !important;
      }
    }

    &.unavailable {
      text-decoration: line-through;
      color: #aaa;
      background-color: #828282;
      pointer-events: none;
    }

    &.in-range {
      background-color: rgba(25, 118, 210, 0.1);
      border-radius: 0;
    }

    &:last-child {
      border-right: none;
    }
  }

  .MuiPickersArrowSwitcher-root {
    button {
      color: #1976d2;
      padding: 4px;
      background: transparent;
      border: none;

      &:hover {
        background-color: rgba(25, 118, 210, 0.1);
      }
    }
  }

  .MuiDayCalendar-slideTransition {
    min-height: 340px;
    background: transparent;
    margin: 0;
    padding: 0;
  }

  .MuiDateCalendar-root {
    width: 280px;
    margin: 0;
    padding: 0;
    background: transparent;
  }
`;

const BookButton = styled(Button)`
  width: 100%;
  padding: 1rem;
  font-size: 1.2rem;
  text-transform: none;
  background: #4CAF50;
  color: white;
  
  &:hover {
    background: #45a049;
  }
  
  &:disabled {
    background: #cccccc;
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

const BungalovDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [fullscreenItem, setFullscreenItem] = useState<string | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [dayCount, setDayCount] = useState(1);
  const [acceptedTerms, setAcceptedTerms] = useState<{ [key: string]: boolean }>({});
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('0');
  const [includeBreakfast, setIncludeBreakfast] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const isPhoneValid = (phoneNumber: string) => {
    // Remove all non-digits and check if it's exactly 11 digits starting with 0
    const digits = phoneNumber.replace(/\D/g, '');
    return /^0\d{10}$/.test(digits);
  };

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value === '' || value === '0') {
      setPhone('0');
    } else {
      setPhone(value.replace(/[^0-9]/g, '').slice(0, 11));
    }
  };

  const bungalov = id ? bungalovs[id] : null;
  const otherBungalovId = id === BUNGALOV_IDS.FIRST ? BUNGALOV_IDS.SECOND : BUNGALOV_IDS.FIRST;
  const otherBungalov = bungalovs[otherBungalovId];
  const config = id ? bookingConfig[id] : null;

  const calculateTotalCost = () => {
    if (!startDate) return 0;
    
    let total = 0;
    const currentDate = new Date(startDate);
    for (let i = 0; i < dayCount; i++) {
      const isWeekend = [5, 6].includes(currentDate.getDay());
      total += isWeekend ? prices.weekend : prices.weekday;
      currentDate.setDate(currentDate.getDate() + 1);
    }

    if (includeBreakfast) {
      total += prices.breakfast * dayCount;
    }

    return total;
  };

  const isDateUnavailable = (date: Date) => {
    if (!config) return true;
    
    // Check if date is in the past
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (date < today) return true;

    // Check if date is in unavailable dates
    const dateString = date.toISOString().split('T')[0];
    return config.unavailableDates.includes(dateString);
  };

  const isDateInRange = (date: Date) => {
    if (!startDate || !endDate) return false;
    return date >= startDate && date < endDate;
  };

  const handleDateChange = (newDate: Date | null, isStart: boolean = true) => {
    if (!newDate) {
      if (isStart) {
        setStartDate(null);
        setEndDate(null);
      }
      return;
    }

    // Reset time to start of day for proper comparison
    newDate.setHours(0, 0, 0, 0);

    if (isStart) {
      // Check if the entire range would be available
      let isRangeAvailable = true;
      let currentDate = new Date(newDate);
      
      for (let i = 0; i < dayCount; i++) {
        if (isDateUnavailable(currentDate)) {
          isRangeAvailable = false;
          break;
        }
        currentDate.setDate(currentDate.getDate() + 1);
      }

      if (isRangeAvailable) {
        setStartDate(newDate);
        const newEndDate = new Date(newDate);
        newEndDate.setDate(newDate.getDate() + dayCount);
        setEndDate(newEndDate);
      }
    }
  };

  const handleDayCountChange = (change: number) => {
    const newCount = dayCount + change;
    if (newCount < 1) return;
    
    if (startDate) {
      // Check if the new range would be available
      let isRangeAvailable = true;
      let currentDate = new Date(startDate);
      
      for (let i = 0; i < newCount; i++) {
        if (isDateUnavailable(currentDate)) {
          isRangeAvailable = false;
          break;
        }
        currentDate.setDate(currentDate.getDate() + 1);
      }

      if (isRangeAvailable) {
        setDayCount(newCount);
        const newEndDate = new Date(startDate);
        newEndDate.setDate(startDate.getDate() + newCount);
        setEndDate(newEndDate);
      }
    } else {
      setDayCount(newCount);
    }
  };

  useEffect(() => {
    if (startDate && config) {
      // Check if any day in the selected range is unavailable
      let currentDate = new Date(startDate);
      for (let i = 0; i < dayCount; i++) {
        if (isDateUnavailable(currentDate)) {
          // If any date is unavailable, reset the selection
          setStartDate(null);
          setEndDate(null);
          setDayCount(1);
          break;
        }
        currentDate.setDate(currentDate.getDate() + 1);
      }
    }
  }, [id]); // Only run when the bungalov id changes

  const handleBooking = () => {
    if (!startDate || !endDate || !areAllTermsAccepted() || !isPhoneValid(phone) || !name.trim() || !email.trim()) return;
    // Implement booking logic here
    alert('Booking request sent!');
  };

  const areAllTermsAccepted = () => {
    return terms.every(term => acceptedTerms[term.id]);
  };

  const handleTermChange = (termId: string, checked: boolean) => {
    setAcceptedTerms(prev => ({
      ...prev,
      [termId]: checked
    }));
  };

  useEffect(() => {
    if (window.location.hash === '#booking') {
      const bookingElement = document.getElementById('booking-section');
      if (bookingElement) {
        bookingElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  const formatDateTurkish = (date: Date | null) => {
    if (!date) return '';
    const months = [
      'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
      'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
    ];
    return `${date.getDate()} ${months[date.getMonth()]}`;
  };

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

  if (!bungalov || !config) {
    return <div>Bungalov not found</div>;
  }

  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        }
      }
    ],
    prevArrow: <CarouselArrow className="carousel-arrow prev"><ArrowBackIosNewIcon /></CarouselArrow>,
    nextArrow: <CarouselArrow className="carousel-arrow next"><ArrowForwardIosIcon /></CarouselArrow>
  };

  const generateMediaItems = (bungalovId: string) => {
    const basePath = `/bungalov/images/${bungalovId}/carousel`;
    const mediaItems = [];

    // Add images
    for (let i = 1; i <= 10; i++) {
      mediaItems.push({
        type: 'image',
        src: `${basePath}/image${i}.webp`
      });
    }

    // Add videos
    for (let i = 1; i <= 2; i++) {
      mediaItems.push({
        type: 'video',
        src: `${basePath}/video${i}.mp4`
      });
    }

    return mediaItems;
  };

  const mediaItems = generateMediaItems(bungalov.id);

  return (
    <DetailContainer>
      <DesktopTopBar $isMobile={isMobile}>
        <CompanyLogo>
          <CabinIcon className="logo-icon" />
          <CompanyName>
            {bungalov.name}
          </CompanyName>
          <BungalovSwitch onClick={() => navigate(`/bungalov/${otherBungalovId}`)} variant="outlined">
            {otherBungalov.name}'{otherBungalov.name.endsWith('e') ? `e` : `a`} Bak
          </BungalovSwitch>

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
      </DesktopTopBar>

      <MobileTopBar $isMobile={isMobile}>
        <IconButton onClick={handleDrawerToggle} style={{ color: 'white'}}>
          <MenuIcon />
        </IconButton>
        <CompanyName>
          {bungalov.name}
        </CompanyName>
        <BungalovSwitch onClick={() => navigate(`/bungalov/${otherBungalovId}`)} variant="outlined">
          {otherBungalov.name}'{otherBungalov.name.endsWith('e') ? `e` : `a`} Bak
        </BungalovSwitch>
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

      <Description>
        {bungalov.description}
      </Description>

      <FeaturesContainer>
        {bungalov.features.map((feature, index) => (
          <FeatureSection 
            key={feature.id} 
            isReversed={index % 2 === 1}
            style={{
              backgroundImage: `url(${feature.image})`,
            }}
          >
            <FeatureImageContainer isReversed={index % 2 === 1}>
              <FeatureImage>
                <img
                  src={feature.image}
                  alt={feature.title}
                  loading="lazy"
                  width="800"
                  height="600"
                  decoding="async"
                />
              </FeatureImage>
            </FeatureImageContainer>
            <FeatureContent isReversed={index % 2 === 1}>
              <Typography variant="h2" component="h2">
                {feature.title}
              </Typography>
              <Typography variant="body1" component="p">
                {feature.description}
              </Typography>
            </FeatureContent>
          </FeatureSection>
        ))}
      </FeaturesContainer>

      <CarouselContainer>
        <Slider {...carouselSettings}>
          {mediaItems.map((item, index) => (
            <MediaItem key={index} onClick={() => setFullscreenItem(item.src)}>
              {item.type === 'image' ? (
                <img src={item.src} alt={`Slide ${index + 1}`} loading="lazy" />
              ) : (
                <video src={item.src} muted loop playsInline />
              )}
            </MediaItem>
          ))}
        </Slider>
      </CarouselContainer>

      <BookingSection  id="booking-section">
          <Box sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
            <Typography variant="h4" gutterBottom>
              Rezervasyon - 
            </Typography>
            <Typography paddingLeft={1} variant="h4" gutterBottom color={'#176629'}>
              {bungalov.name}
            </Typography>
         
        </Box>

        
        <BookingContainer>
          <BookingContent padding={3}>

            <CalendarContainer>
              <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={tr}>
                <StaticDatePicker
                  displayStaticWrapperAs="desktop"
                  value={startDate}
                  onChange={(date) => handleDateChange(date, true)}
                  disablePast
                  shouldDisableDate={isDateUnavailable}
                  slotProps={{
                    toolbar: { hidden: true },
                    actionBar: { hidden: true },
                    day: { 
                      sx: { 
                        margin: 0,
                        padding: 0,
                        width: 40,
                        height: 32,
                        background: 'transparent',
                        border: 'none',
                        borderRight: '1px solid rgba(0, 0, 0, 0.1)',
                        borderRadius: 0,
                        cursor: 'pointer',
                        '&:hover:not(.Mui-selected):not(.unavailable)': {
                          backgroundColor: 'rgba(25, 118, 210, 0.1)'
                        },
                        '&.Mui-selected': {
                          backgroundColor: '#1976d2 !important',
                          color: '#fff !important',
                          fontWeight: 500,

                          '&:hover': {
                            backgroundColor: '#1565c0 !important'
                          }
                        },
                        '&.unavailable': {
                          color: '#d8d8d8',
                          backgroundColor: '#aaa',
                          pointerEvents: 'none'
                        },
                        '&.in-range': {
                          backgroundColor: 'rgba(25, 118, 210, 0.1)',
                          borderRadius: 0
                        },
                        '&:last-child': {
                          borderRight: 'none'
                        }
                      }
                    },
                    calendarHeader: {
                      sx: {
                        margin: 0,
                        padding: '8px 0',
                        background: 'transparent'
                      }
                    }
                  }}
                  sx={{
                    width: 280,
                    margin: 0,
                    padding: 0,
                    background: 'transparent',
                    '& .MuiDayCalendar-header': {
                      display: 'flex',
                      justifyContent: 'space-between',
                      padding: 0,
                      margin: 0,
                      background: 'transparent'
                    },
                    '& .MuiDayCalendar-weekContainer': {
                      display: 'flex',
                      justifyContent: 'space-between',
                      margin: 0,
                      padding: 0,
                      minHeight: 32,
                      background: 'transparent',
                      borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
                      '&:last-child': {
                        borderBottom: 'none'
                      }
                    },
                    '& .MuiDayCalendar-monthContainer': {
                      minHeight: 240,
                      margin: 0,
                      padding: 0,
                      background: 'transparent'
                    }
                  }}
                  slots={{
                    day: (props) => {
                      const isUnavailable = isDateUnavailable(props.day);
                      const isSelected = 
                        (startDate && props.day.getTime() === startDate.getTime()) ||
                        isDateInRange(props.day);
                      
                      const handleClick = () => {
                        if (isUnavailable) return;
                        handleDateChange(props.day, true);
                      };

                      return (
                        <Box
                          component="button"
                          onClick={handleClick}
                          {...props}
                          sx={{
                            margin: 0,
                            padding: 0,
                            width: 40,
                            height: 32,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: 'transparent',
                            border: 'none',
                            borderRight: '1px solid rgba(0, 0, 0, 0.1)',
                            borderRadius: 0,
                            cursor: isUnavailable ? 'not-allowed' : 'pointer',
                            backgroundColor: isSelected ? '#1976d2 !important' : 'transparent',
                            color: isSelected ? '#fff !important' : '#333',
                            '&:hover:not(.Mui-selected):not(.unavailable)': {
                              backgroundColor: 'rgba(25, 118, 210, 0.1)'
                            },
                            '&.Mui-selected': {
                              backgroundColor: '#1976d2 !important',
                              color: '#fff !important',
                              fontWeight: 500,

                              '&:hover': {
                                backgroundColor: '#1565c0 !important'
                              }
                            },
                            '&.unavailable': {
                              color: '#d8d8d8',
                              backgroundColor: '#aaa',
                              pointerEvents: 'none'
                            },
                            '&.in-range': {
                              backgroundColor: 'rgba(25, 118, 210, 0.1)',
                              borderRadius: 0
                            },
                            '&:last-child': {
                              borderRight: 'none'
                            }
                          }}
                          className={`${props.className} ${isUnavailable ? 'unavailable' : ''} ${isSelected ? 'Mui-selected' : ''} ${isDateInRange(props.day) ? 'in-range' : ''}`}
                        >
                          {props.day.getDate()}
                        </Box>
                      );
                    }
                  }}
                />
              </LocalizationProvider>
            </CalendarContainer>
            
            <BookingInfo>
              <BookingDetails>
                <DateDisplayContainer>
                  <DateInfo>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      Giriş:
                    </Typography>
                    <Typography variant="body1">
                      {formatDateTurkish(startDate)} - 14:00
                    </Typography>
                  </DateInfo>
                  <DateInfo>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      Çıkış:
                    </Typography>
                    <Typography variant="body1">
                      {formatDateTurkish(endDate)} - 11:00
                    </Typography>
                  </DateInfo>
                  <DayCountInfo>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <IconButton 
                        onClick={() => handleDayCountChange(-1)}
                        disabled={dayCount === 1}
                        size="small"
                      >
                        <RemoveIcon />
                      </IconButton>
                      <Typography>
                        {dayCount} {dayCount === 1 ? 'Gün' : 'Gün'}
                      </Typography>
                      <IconButton
                        onClick={() => handleDayCountChange(1)}
                        size="small"
                      >
                        <AddIcon />
                      </IconButton>
                    </Box>
                  </DayCountInfo>

                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={includeBreakfast}
                        onChange={(e) => setIncludeBreakfast(e.target.checked)}
                      />
                    }
                    label={`Kahvaltı ekle (+${prices.breakfast} ₺/gün)`}
                  />

                  <TotalCostInfo>
                    <CabinIcon />
                    <Box>Toplam:</Box>
                    <Box sx={{ fontSize: '1.7rem', whiteSpace: 'pre-line' }}>
                       {calculateTotalCost().toLocaleString('tr-TR')} ₺
                    </Box>
                  </TotalCostInfo>
                </DateDisplayContainer>
              </BookingDetails>
            </BookingInfo>

          </BookingContent>

          <BookingActions>
            <TextField
              label="Ad Soyad"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="E-posta"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="Telefon"
              value={phone}
              onChange={handlePhoneChange}
              fullWidth
              sx={{ mb: 2 }}
              error={phone.length > 1 && !isPhoneValid(phone)}
              helperText={phone.length > 1 && !isPhoneValid(phone) ? "Geçerli bir telefon numarası giriniz" : ""}
              inputProps={{
                maxLength: 11
              }}
            />
            {terms.map(term => (
              <FormControlLabel
                key={term.id}
                control={
                  <Checkbox
                    checked={acceptedTerms[term.id] || false}
                    onChange={(e) => handleTermChange(term.id, e.target.checked)}
                  />
                }
                label={
                  <span dangerouslySetInnerHTML={{ __html: term.text }} />
                }
              />
            ))}
            <BookButton
              variant="contained"
              onClick={handleBooking}
              disabled={!startDate || !endDate || !areAllTermsAccepted() || !isPhoneValid(phone) || !name.trim() || !email.trim()}
            >
              Rezervasyon Yap
            </BookButton>
          </BookingActions>
        </BookingContainer>
      </BookingSection>

      <FullscreenModal
        open={!!fullscreenItem}
        onClose={() => setFullscreenItem(null)}
      >
        <Box className="modal-content">
          <IconButton 
            className="close-button" 
            onClick={() => setFullscreenItem(null)}
          >
            <CloseIcon />
          </IconButton>
          {fullscreenItem?.endsWith('.mp4') ? (
            <video
              src={fullscreenItem}
              controls
              autoPlay
              loop
            />
          ) : (
            <img src={fullscreenItem || ''} alt="Fullscreen view" />
          )}
        </Box>
      </FullscreenModal>

    </DetailContainer>
  );
};

export default BungalovDetail;
