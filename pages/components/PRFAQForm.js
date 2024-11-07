import React, { useState } from 'react';
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Text,
  Input,
  Button,
  Textarea,
  FormLabel,
  Progress,
  Alert,
  AlertDescription,
  Grid,
  GridItem,
  Flex,
  VStack,
  HStack,
  Spinner
} from '@chakra-ui/react';
import { 
  Rocket, 
  Mail, 
  Sparkles,
  Zap,
  FlameKindling,
  Target, 
  Users, 
  Building2, 
  BarChart2,
  MessageSquare,
  AlertCircle
} from 'lucide-react';

const PRFAQForm = () => {
  const [step, setStep] = useState(1);
  const totalSteps = 4;
  const [isLoading, setIsLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState(new Set());
  
  const [formData, setFormData] = useState({
    productName: '',
    productInnovationLevel: 0,
    productDescription: '',
    problemDescription: '',
    solution: '',
    targetAudience: '',
    currentMetrics: '',
    futureMetrics: '',
    selectedKPIs: [],
    businessModel: '',
    additionalInfo: '',
    userEmail: '',
    businessContact: ''
  });

  const innovationLevels = [
    { value: 1, label: 'פיצ\'ר/שו"ש חמוד', icon: <Sparkles className="w-6 h-6" /> },
    { value: 2, label: 'מוצר אשש', icon: <Zap className="w-6 h-6" /> },
    { value: 3, label: 'מוצר מטוררררף!', icon: <FlameKindling className="w-6 h-6" /> }
  ];

  const kpiExamples = [
    { id: 'acquisition', label: 'רכישת לקוחות', description: 'כמות לקוחות חדשים שהצטרפו למוצר' },
    { id: 'retention', label: 'שימור לקוחות', description: 'אחוז הלקוחות שממשיכים להשתמש במוצר' },
    { id: 'satisfaction', label: 'שביעות רצון', description: 'ציון NPS של המוצר' },
    { id: 'revenue', label: 'הכנסות', description: 'הכנסה חודשית ממוצעת מהמוצר' },
    { id: 'usage', label: 'שימוש במוצר', description: 'תדירות השימוש במוצר' },
    { id: 'processing', label: 'יעילות תפעולית', description: 'זמן עיבוד ממוצע של פעולות במוצר' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (value) {
      setValidationErrors(prev => {
        const next = new Set(prev);
        next.delete(field);
        return next;
      });
    }
  };

  const validateStep = () => {
    const newValidationErrors = new Set();
    
    switch(step) {
      case 1:
        if (!formData.productDescription) newValidationErrors.add('productDescription');
        if (!formData.productInnovationLevel) newValidationErrors.add('productInnovationLevel');
        break;
      case 2:
        if (!formData.problemDescription) newValidationErrors.add('problemDescription');
        break;
      case 4:
        if (!formData.userEmail) newValidationErrors.add('userEmail');
        break;
    }
    
    setValidationErrors(newValidationErrors);
    return newValidationErrors.size === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      setStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setStep(prev => prev - 1);
  };
  const renderInnovationLevel = () => {    
    return (
      <Grid templateColumns="repeat(3, 1fr)" gap={4}>
        {innovationLevels.map((level) => (
          <Box
            key={level.value}
            p={4}
            borderWidth="1px"
            borderRadius="lg"
            cursor="pointer"
            transition="all 0.2s"
            bg={formData.productInnovationLevel === level.value ? 'blue.50' : undefined}
            borderColor={
              formData.productInnovationLevel === level.value 
                ? 'blue.500'
                : validationErrors.has('productInnovationLevel')
                  ? 'red.500'
                  : 'gray.200'
            }
            _hover={{ borderColor: 'blue.500' }}
            onClick={() => handleInputChange('productInnovationLevel', level.value)}
          >
            <VStack>
              {level.icon}
              <Text fontWeight="medium">{level.label}</Text>
            </VStack>
          </Box>
        ))}
        {validationErrors.has('productInnovationLevel') && (
          <Text color="red.500" fontSize="sm" display="flex" alignItems="center" gridColumn="span 3">
            <AlertCircle style={{ marginLeft: '0.25rem' }} />
            יש לבחור רמת חדשנות למוצר
          </Text>
        )}
      </Grid>
    );
  };

  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <Box dir="rtl">
            <CardHeader>
              <Heading size="md" display="flex" alignItems="center" gap={2}>
                <Rocket />
                פרטי המוצר הבסיסיים
              </Heading>
              <Text color="gray.600">
                הזן את הפרטים הבסיסיים של המוצר החדש
              </Text>
            </CardHeader>
            <CardBody>
              <VStack spacing={6}>
                <Box width="100%">
                  <FormLabel>תיאור קצר של המוצר *</FormLabel>
                  <Textarea
                    value={formData.productDescription}
                    onChange={(e) => handleInputChange('productDescription', e.target.value)}
                    placeholder="תאר בקצרה את המוצר החדש"
                    borderColor={validationErrors.has('productDescription') ? 'red.500' : undefined}
                  />
                  {validationErrors.has('productDescription') && (
                    <Text color="red.500" fontSize="sm" mt={1} display="flex" alignItems="center">
                      <AlertCircle style={{ marginLeft: '0.25rem' }} />
                      שדה חובה - יש למלא תיאור מוצר
                    </Text>
                  )}
                </Box>
                <Box width="100%">
                  <FormLabel>רמת חדשנות המוצר *</FormLabel>
                  {renderInnovationLevel()}
                </Box>
              </VStack>
            </CardBody>
          </Box>
        );
      
      case 2:
        return (
          <Box dir="rtl">
            <CardHeader>
              <Heading size="md" display="flex" alignItems="center" gap={2}>
                <Target />
                בעיה ופתרון
              </Heading>
              <Text color="gray.600">
                תאר את הבעיה העסקית והפתרון המוצע
              </Text>
            </CardHeader>
            <CardBody>
              <VStack spacing={6}>
                <Box width="100%">
                  <FormLabel>תיאור הבעיה העסקית *</FormLabel>
                  <Textarea
                    value={formData.problemDescription}
                    onChange={(e) => handleInputChange('problemDescription', e.target.value)}
                    placeholder="מה הבעיה שהמוצר פותר?"
                    borderColor={validationErrors.has('problemDescription') ? 'red.500' : undefined}
                  />
                  {validationErrors.has('problemDescription') && (
                    <Text color="red.500" fontSize="sm" mt={1} display="flex" alignItems="center">
                      <AlertCircle style={{ marginLeft: '0.25rem' }} />
                      שדה חובה - יש למלא תיאור הבעיה
                    </Text>
                  )}
                </Box>
                <Box width="100%">
                  <FormLabel>הפתרון המוצע</FormLabel>
                  <Textarea
                    value={formData.solution}
                    onChange={(e) => handleInputChange('solution', e.target.value)}
                    placeholder="כיצד המוצר פותר את הבעיה?"
                  />
                </Box>
                <Box width="100%">
                  <FormLabel>קהל היעד</FormLabel>
                  <Textarea
                    value={formData.targetAudience}
                    onChange={(e) => handleInputChange('targetAudience', e.target.value)}
                    placeholder="מיהו קהל היעד של המוצר?"
                  />
                </Box>
              </VStack>
            </CardBody>
          </Box>
        );
case 3:
        return (
          <Box dir="rtl">
            <CardHeader>
              <Heading size="md" display="flex" alignItems="center" gap={2}>
                <BarChart2 />
                מדדים ונתונים
              </Heading>
              <Text color="gray.600">
                הגדר את המדדים העסקיים של המוצר
              </Text>
            </CardHeader>
            <CardBody>
              <VStack spacing={6}>
                <Box width="100%">
                  <FormLabel>מדדים נוכחיים</FormLabel>
                  <Textarea
                    value={formData.currentMetrics}
                    onChange={(e) => handleInputChange('currentMetrics', e.target.value)}
                    placeholder="מהם המדדים הנוכחיים?"
                  />
                </Box>
                <Box width="100%">
                  <FormLabel>מדדים עתידיים צפויים</FormLabel>
                  <Textarea
                    value={formData.futureMetrics}
                    onChange={(e) => handleInputChange('futureMetrics', e.target.value)}
                    placeholder="מהם המדדים הצפויים לאחר השקת המוצר?"
                  />
                </Box>
                <Box width="100%">
                  <FormLabel>KPIs מרכזיים</FormLabel>
                  <Grid templateColumns="repeat(2, 1fr)" gap={4} mt={2}>
                    {kpiExamples.map(kpi => (
                      <Box
                        key={kpi.id}
                        p={4}
                        borderWidth="1px"
                        borderRadius="lg"
                        cursor="pointer"
                        transition="all 0.2s"
                        bg={formData.selectedKPIs.includes(kpi.id) ? 'blue.50' : undefined}
                        borderColor={formData.selectedKPIs.includes(kpi.id) ? 'blue.500' : 'gray.200'}
                        _hover={{ borderColor: 'blue.500' }}
                        onClick={() => {
                          const updatedKPIs = formData.selectedKPIs.includes(kpi.id)
                            ? formData.selectedKPIs.filter(id => id !== kpi.id)
                            : [...formData.selectedKPIs, kpi.id];
                          handleInputChange('selectedKPIs', updatedKPIs);
                        }}
                      >
                        <Text fontWeight="medium">{kpi.label}</Text>
                        <Text fontSize="sm" color="gray.600">{kpi.description}</Text>
                      </Box>
                    ))}
                  </Grid>
                </Box>
              </VStack>
            </CardBody>
          </Box>
        );

      case 4:
        return (
          <Box dir="rtl">
            <CardHeader>
              <Heading size="md" display="flex" alignItems="center" gap={2}>
                <MessageSquare />
                מידע נוסף ופרטי התקשרות
              </Heading>
              <Text color="gray.600">
                הוסף מידע משלים ופרטי התקשרות
              </Text>
            </CardHeader>
            <CardBody>
              <VStack spacing={6}>
                <Box width="100%">
                  <FormLabel>מידע נוסף שיעזור לדייק את ה-PRFAQ</FormLabel>
                  <Textarea
                    value={formData.additionalInfo}
                    onChange={(e) => handleInputChange('additionalInfo', e.target.value)}
                    placeholder="הוסף מידע נוסף שיכול לעזור ביצירת PRFAQ מדויק יותר"
                    minHeight="32"
                  />
                </Box>
                <Box width="100%">
                  <FormLabel>כתובת מייל *</FormLabel>
                  <Input
                    type="email"
                    value={formData.userEmail}
                    onChange={(e) => handleInputChange('userEmail', e.target.value)}
                    placeholder="הזן את כתובת המייל שלך"
                    borderColor={validationErrors.has('userEmail') ? 'red.500' : undefined}
                  />
                  {validationErrors.has('userEmail') && (
                    <Text color="red.500" fontSize="sm" mt={1} display="flex" alignItems="center">
                      <AlertCircle style={{ marginLeft: '0.25rem' }} />
                      שדה חובה - יש להזין כתובת מייל
                    </Text>
                  )}
                </Box>
                {formData.productInnovationLevel >= 2 && (
                  <Box width="100%">
                    <FormLabel>פרטי איש קשר עסקי</FormLabel>
                    <Input
                      value={formData.businessContact}
                      onChange={(e) => handleInputChange('businessContact', e.target.value)}
                      placeholder="שם ותפקיד של איש הקשר העסקי"
                    />
                  </Box>
                )}
              </VStack>
            </CardBody>
          </Box>
        );
    }
  };

  const progressPercentage = (step / totalSteps) * 100;

  return (
    <Box maxWidth="4xl" mx="auto" p={4}>
      <Card>
        <Box p={6}>
          <Progress value={progressPercentage} mb={6} />
          {renderStep()}
          <Flex justifyContent="space-between" mt={6} dir="rtl">
            {step > 1 && (
              <Button onClick={handleBack} variant="outline">
                חזור
              </Button>
            )}
            <Box flex="1" />
            {step < totalSteps ? (
              <Button onClick={handleNext} colorScheme="blue">
                המשך
              </Button>
            ) : (
              <Button
                isDisabled={isLoading}
                onClick={async () => {
                  if (!validateStep()) return;
                  setIsLoading(true);
                  try {
                    // כאן תהיה הלוגיקה של שליחת הטופס
                    await new Promise(resolve => setTimeout(resolve, 2000)); // סימולציה של שליחה
                    alert('המסמכים נוצרו בהצלחה ונשלחו לכתובת המייל שהזנת');
                  } catch (error) {
                    alert('אירעה שגיאה בעת יצירת המסמכים. אנא נסה שנית');
                  } finally {
                    setIsLoading(false);
                  }
                }}
                colorScheme="blue"
              >
                {isLoading ? (
                  <HStack>
                    <Spinner size="sm" />
                    <Text>יוצר מסמכים...</Text>
                  </HStack>
                ) : (
                  <HStack>
                    <Mail />
                    <Text>שלח ויצר PRFAQ</Text>
                  </HStack>
                )}
              </Button>
            )}
          </Flex>
        </Box>
      </Card>
    </Box>
  );
};

export default PRFAQForm;
