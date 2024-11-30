import React, { useState, useEffect, memo } from 'react';
import { Box, TextField, Button, Typography, Paper, Tabs, Tab, styled } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { prices } from '../../config/prices';
import { bookingConfig } from '../../config/bookings';
import { BUNGALOV_IDS } from '../../config/bungalovs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { tr } from 'date-fns/locale';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { Badge } from '@mui/material';
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay';

const CONSOLE_PASSWORD = 'bungalov2024'; // You should move this to a secure environment variable

const ConsoleContainer = styled(Box)`
  min-height: 100vh;
  padding: 24px;
  background: #f5f5f5;
`;

const LoginContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 24px;
  background: #f5f5f5;
`;

const ContentContainer = styled(Paper)`
  padding: 24px;
  margin: 24px auto;
  max-width: 800px;
`;

const PriceField = styled(TextField)`
  margin: 8px 0;
`;

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const Console: React.FC = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [tabValue, setTabValue] = useState(0);
  
  // Prices state
  const [weekdayPrice, setWeekdayPrice] = useState(prices.weekday.toString());
  const [weekendPrice, setWeekendPrice] = useState(prices.weekend.toString());
  const [breakfastPrice, setBreakfastPrice] = useState(prices.breakfast.toString());
  
  // Bookings state
  const [selectedBungalov, setSelectedBungalov] = useState<string>(BUNGALOV_IDS.FIRST);
  const [selectedDates, setSelectedDates] = useState<string[]>([]);
  const [unavailableDates, setUnavailableDates] = useState<string[]>([]);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  useEffect(() => {
    if (selectedBungalov) {
      setUnavailableDates(bookingConfig[selectedBungalov].unavailableDates);
      setSelectedDates([]);
      setHasUnsavedChanges(false);
    }
  }, [selectedBungalov]);

  const handleLogin = () => {
    if (password === CONSOLE_PASSWORD) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect password');
    }
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handlePriceUpdate = async () => {
    try {
      const response = await fetch('/api/update-prices', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          weekday: parseInt(weekdayPrice),
          weekend: parseInt(weekendPrice),
          breakfast: parseInt(breakfastPrice),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update prices');
      }

      alert('Prices updated successfully');
    } catch (error) {
      alert('Error updating prices');
      console.error('Error:', error);
    }
  };

  const handleDayClick = (date: Date | null) => {
    if (!date) return;
    
    const dateString = date.toISOString().split('T')[0];
    setSelectedDates(prev => {
      const isSelected = prev.includes(dateString);
      setHasUnsavedChanges(true);
      return isSelected ? prev.filter(d => d !== dateString) : [...prev, dateString];
    });
  };

  const handleSaveAvailability = async () => {
    if (!selectedBungalov || selectedDates.length === 0) return;
    
    try {
      const response = await fetch('/api/update-multiple-availability', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bungalovId: selectedBungalov,
          dates: selectedDates,
          action: 'toggle',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update availability');
      }

      // Update local state
      setUnavailableDates(prev => {
        const newUnavailable = [...prev];
        selectedDates.forEach(date => {
          if (prev.includes(date)) {
            const index = newUnavailable.indexOf(date);
            newUnavailable.splice(index, 1);
          } else {
            newUnavailable.push(date);
          }
        });
        return newUnavailable;
      });

      setSelectedDates([]);
      setHasUnsavedChanges(false);
      alert('Availability updated successfully');
    } catch (error) {
      alert('Error updating availability');
      console.error('Error:', error);
    }
  };

  const renderDay = React.memo((
    pickersDayProps: PickersDayProps<Date> & {
      selectedDates?: Array<Date | null>;
    }
  ) => {
    const { day, selectedDates = [] } = pickersDayProps;
    const dateString = day.toISOString().split('T')[0];
    const isUnavailable = unavailableDates.includes(dateString);
    const isSelected = selectedDates.some(selectedDate => {
      if (!selectedDate) return false;
      return selectedDate instanceof Date ? 
        selectedDate.toISOString().split('T')[0] === dateString :
        selectedDate === dateString;
    });

    return (
      <Badge
        key={dateString}
        overlap="circular"
        // badgeContent={isUnavailable ? '🚫' : null}
      >
        <PickersDay 
          {...pickersDayProps}
          selected={isSelected != isUnavailable}
          sx={{
            backgroundColor: isSelected ? '#e3f2fd' : 'inherit',
            '&:hover': {
              backgroundColor: isSelected ? '#bbdefb' : 'inherit',
            }
          }}
        />
      </Badge>
    );
  });

  if (!isAuthenticated) {
    return (
      <LoginContainer>
        <Paper elevation={3} sx={{ p: 4, maxWidth: 400, width: '100%' }}>
          <Typography variant="h5" gutterBottom>
            Console Login
          </Typography>
          <TextField
            fullWidth
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!error}
            helperText={error}
            sx={{ mb: 2 }}
          />
          <Button
            fullWidth
            variant="contained"
            onClick={handleLogin}
          >
            Login
          </Button>
        </Paper>
      </LoginContainer>
    );
  }

  return (
    <ConsoleContainer>
      <ContentContainer>
        <Typography variant="h4" gutterBottom>
          Admin Console
        </Typography>
        
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="Prices" />
          <Tab label="Availability" />
        </Tabs>

        <TabPanel value={tabValue} index={0}>
          <Typography variant="h6" gutterBottom>
            Update Prices
          </Typography>
          <PriceField
            fullWidth
            label="Weekday Price"
            type="number"
            value={weekdayPrice}
            onChange={(e) => setWeekdayPrice(e.target.value)}
          />
          <PriceField
            fullWidth
            label="Weekend Price"
            type="number"
            value={weekendPrice}
            onChange={(e) => setWeekendPrice(e.target.value)}
          />
          <PriceField
            fullWidth
            label="Breakfast Price"
            type="number"
            value={breakfastPrice}
            onChange={(e) => setBreakfastPrice(e.target.value)}
          />
          <Button
            variant="contained"
            onClick={handlePriceUpdate}
            sx={{ mt: 2 }}
          >
            Update Prices
          </Button>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Typography variant="h6" gutterBottom>
            Manage Availability
          </Typography>
          <Box sx={{ mb: 2 }}>
            <Button
              variant={selectedBungalov === BUNGALOV_IDS.FIRST ? 'contained' : 'outlined'}
              onClick={() => setSelectedBungalov(BUNGALOV_IDS.FIRST)}
              sx={{ mr: 1 }}
            >
              Bungalov 1
            </Button>
            <Button
              variant={selectedBungalov === BUNGALOV_IDS.SECOND ? 'contained' : 'outlined'}
              onClick={() => setSelectedBungalov(BUNGALOV_IDS.SECOND)}
            >
              Bungalov 2
            </Button>
          </Box>
          
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={tr}>
            <DateCalendar
              onChange={handleDayClick}
              slots={{
                day: renderDay
              }}
              slotProps={{
                day: {
                  selectedDates: selectedDates
                } as any
              }}
            />
          </LocalizationProvider>

          <Button
            variant="contained"
            onClick={handleSaveAvailability}
            disabled={!hasUnsavedChanges}
            sx={{ mt: 2 }}
          >
            Save Changes
          </Button>
        </TabPanel>
      </ContentContainer>
    </ConsoleContainer>
  );
};

export default Console;
