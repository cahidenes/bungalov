import React from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';

const Terms: React.FC = () => {
  return (
    <Container maxWidth="md">
      <Box sx={{ py: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Kullanım Koşulları
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
            1. Koşulların Kabulü
          </Typography>
          <Typography paragraph>
            Bu web sitesine erişerek ve kullanarak, bu sözleşmenin hüküm ve koşullarını kabul etmiş olursunuz.
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
            2. Rezervasyon ve Booking
          </Typography>
          <Typography paragraph>
            Tüm rezervasyonlar müsaitlik durumuna ve onaya tabidir. Rezervasyon, onay e-postası alındıktan ve gerekli ödeme işlemi tamamlandıktan sonra kesinleşir.
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
            3. İptal Politikası
          </Typography>
          <Typography paragraph>
            Tam geri ödeme alabilmek için iptaller giriş tarihinden en az 48 saat önce yapılmalıdır. Geç iptal veya giriş yapılmaması durumunda ücret talep edilebilir.
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
            4. Giriş ve Çıkış
          </Typography>
          <Typography paragraph>
            Standart giriş saati 14:00'ten itibaren, çıkış saati ise 11:00'e kadardır. Erken giriş veya geç çıkış talep üzerine ve ek ücrete tabi olarak mümkün olabilir.
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
            5. Tesis Kuralları
          </Typography>
          <Typography paragraph>
            Misafirler tesise ve diğer misafirlere saygılı olmak zorundadır. Sessiz saatler 22:00 - 07:00 arasındadır. Bungalovların içinde sigara içmek yasaktır. Evcil hayvanlar sadece önceden onay alınmış ve belirlenmiş evcil hayvan dostu ünitelerde kabul edilir.
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
            6. Sorumluluk
          </Typography>
          <Typography paragraph>
            Misafirlerin kişisel eşyalarının kaybolması, çalınması veya hasar görmesinden sorumlu değiliz. Misafirler, konaklamaları sırasında tesise verdikleri hasarlardan sorumludur.
          </Typography>

          <Typography variant="body2" sx={{ mt: 4, color: 'text.secondary' }}>
            Son güncelleme: {new Date().toLocaleDateString('tr-TR')}
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
};

export default Terms;
