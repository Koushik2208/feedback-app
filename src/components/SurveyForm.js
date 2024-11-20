import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Rating,
  Slider,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
  Select,
  MenuItem,
  Checkbox,
  Button,
  Paper,
  TextField,
  Stack,
  Divider,
} from '@mui/material';
import { Star, Smile, Meh, Frown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const emotions = [
  { icon: <Smile style={{ width: 48, height: 48 }} />, label: 'Happy', value: 3 },
  { icon: <Meh style={{ width: 48, height: 48 }} />, label: 'Neutral', value: 2 },
  { icon: <Frown style={{ width: 48, height: 48 }} />, label: 'Unhappy', value: 1 },
];

// Define the questionnaire
const questions = [
  {
    id: 1,
    question: "How often do you use our product/service?",
    options: [
      "Daily",
      "Weekly",
      "Monthly",
      "Less than monthly"
    ]
  },
  {
    id: 2,
    question: "What is your primary purpose for using our product/service?",
    options: [
      "Business",
      "Personal",
      "Both",
      "Other"
    ]
  },
  {
    id: 3,
    question: "How did you first hear about us?",
    options: [
      "Social Media",
      "Search Engine",
      "Word of Mouth",
      "Advertisement",
      "Other"
    ]
  }
];

export default function SurveyForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    satisfaction: 5,
    recommendation: 7,
    emotion: 3,
    serviceQuality: '',
    improvements: [],
    category: '',
    comments: '',
    questionnaire: {} // New state for questionnaire responses
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Survey submitted:', formData);
    alert('Thank you for your feedback!');
    navigate('/dynamic-form');
  };

  const handleChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value,
    });
  };

  const handleCheckboxChange = (value) => {
    const improvements = formData.improvements.includes(value)
      ? formData.improvements.filter((item) => item !== value)
      : [...formData.improvements, value];
    setFormData({ ...formData, improvements });
  };

  const handleQuestionChange = (questionId, answer) => {
    setFormData({
      ...formData,
      questionnaire: {
        ...formData.questionnaire,
        [questionId]: answer
      }
    });
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }} >
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
          Customer Feedback Survey
        </Typography>

        <form onSubmit={handleSubmit}>
          <Stack spacing={4}>
            {/* Overall Satisfaction */}
            <Box>
              <Typography component="legend" variant="h6" gutterBottom>
                Overall Satisfaction
              </Typography>
              <Rating
                value={formData.satisfaction}
                onChange={(_, value) => setFormData({ ...formData, satisfaction: value || 0 })}
                size="large"
                icon={<Star style={{ width: 32, height: 32, fill: '#facc15' }} />}
                emptyIcon={<Star style={{ width: 32, height: 32 }} />}
              />
            </Box>

            {/* Emotional Response */}
            <Box>
              <Typography component="legend" variant="h6" gutterBottom>
                How do you feel about our service?
              </Typography>
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-around', 
                gap: 2, 
                mt: 2 
              }}>
                {emotions.map((emotion) => (
                  <Box
                    key={emotion.value}
                    onClick={() => setFormData({ ...formData, emotion: emotion.value })}
                    sx={{
                      cursor: 'pointer',
                      p: 2,
                      borderRadius: 2,
                      transition: 'all 0.2s',
                      backgroundColor: 'transparent',
                      '&:hover': {
                        transform: 'scale(1.05)',
                      },
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 1,
                    }}
                  >
                    <Box sx={{ 
                      color: formData.emotion === emotion.value ? '#2563eb' : '#64748b',
                      transition: 'color 0.2s'
                    }}>
                      {emotion.icon}
                    </Box>
                    <Typography
                      sx={{
                        fontWeight: formData.emotion === emotion.value ? 600 : 400,
                        color: formData.emotion === emotion.value ? '#2563eb' : '#64748b',
                      }}
                    >
                      {emotion.label}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>

            {/* Recommendation Score */}
            <Box>
              <Typography component="legend" variant="h6" gutterBottom>
                How likely are you to recommend us? (0-10)
              </Typography>
              <Slider
                value={formData.recommendation}
                onChange={(_, value) => setFormData({ ...formData, recommendation: value })}
                marks
                min={0}
                max={10}
                valueLabelDisplay="auto"
                sx={{ maxWidth: 500, mx: 'auto' }}
              />
            </Box>

            {/* Service Quality */}
            <FormControl>
              <FormLabel>How would you rate our service quality?</FormLabel>
              <RadioGroup value={formData.serviceQuality} onChange={handleChange('serviceQuality')}>
                <FormControlLabel value="excellent" control={<Radio />} label="Excellent" />
                <FormControlLabel value="good" control={<Radio />} label="Good" />
                <FormControlLabel value="fair" control={<Radio />} label="Fair" />
                <FormControlLabel value="poor" control={<Radio />} label="Poor" />
              </RadioGroup>
            </FormControl>

            {/* Areas of Improvement */}
            <FormControl>
              <FormLabel>What areas need improvement? (Select all that apply)</FormLabel>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, ml: 2 }}>
                {['Customer Service', 'Product Quality', 'Website Experience', 'Pricing', 'Delivery'].map((item) => (
                  <FormControlLabel
                    key={item}
                    control={
                      <Checkbox
                        checked={formData.improvements.includes(item)}
                        onChange={() => handleCheckboxChange(item)}
                      />
                    }
                    label={item}
                  />
                ))}
              </Box>
            </FormControl>

            {/* Category Selection */}
            <FormControl>
              <FormLabel>Which category best describes your interaction?</FormLabel>
              <Select value={formData.category} onChange={handleChange('category')} sx={{ mt: 1 }}>
                <MenuItem value="product">Product Purchase</MenuItem>
                <MenuItem value="service">Service Usage</MenuItem>
                <MenuItem value="support">Customer Support</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
            </FormControl>

            {/* Questionnaire Section */}
            <Box>
              <Divider sx={{ my: 4 }} />
              <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
                Additional Questions
              </Typography>
              <Stack spacing={3}>
                {questions.map((q) => (
                  <FormControl key={q.id}>
                    <FormLabel>{q.question}</FormLabel>
                    <RadioGroup
                      value={formData.questionnaire[q.id] || ''}
                      onChange={(e) => handleQuestionChange(q.id, e.target.value)}
                    >
                      {q.options.map((option) => (
                        <FormControlLabel
                          key={option}
                          value={option}
                          control={<Radio />}
                          label={option}
                        />
                      ))}
                    </RadioGroup>
                  </FormControl>
                ))}
              </Stack>
            </Box>

            {/* Additional Comments */}
            <TextField
              label="Additional Comments"
              multiline
              rows={4}
              value={formData.comments}
              onChange={handleChange('comments')}
              fullWidth
            />

            <Button
              type="submit"
              variant="contained"
              size="large"
              sx={{
                mt: 4,
                py: 1.5,
                backgroundColor: '#2563eb',
                '&:hover': {
                  backgroundColor: '#1d4ed8',
                },
              }}
            >
              Submit Feedback
            </Button>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
}