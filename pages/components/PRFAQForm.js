import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
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
      <div className="grid grid-cols-3 gap-4">
        {innovationLevels.map((level) => (
          <div 
            key={level.value}
            className={`p-4 border rounded-lg cursor-pointer transition-all ${
              formData.productInnovationLevel === level.value 
                ? 'border-primary bg-primary/10' 
                : validationErrors.has('productInnovationLevel')
                  ? 'border-red-500'
                  : 'hover:border-primary'
            }`}
            onClick={() => handleInputChange('productInnovationLevel', level.value)}
          >
            <div className="flex flex-col items-center text-center">
              {level.icon}
              <div className="font-medium mt-2">{level.label}</div>
            </div>
          </div>
        ))}
        {validationErrors.has('productInnovationLevel') && (
          <p className="text-red-500 text-sm mt-1 flex items-center justify-center col-span-3">
            <AlertCircle className="w-4 h-4 ml-1" />
            יש לבחור רמת חדשנות למוצר
          </p>
        )}
      </div>
    );
  };

  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <div className="space-y-4" dir="rtl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Rocket className="w-6 h-6" />
                פרטי המוצר הבסיסיים
              </CardTitle>
              <CardDescription>
                הזן את הפרטים הבסיסיים של המוצר החדש
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <Label>תיאור קצר של המוצר *</Label>
                  <Textarea
                    value={formData.productDescription}
                    onChange={(e) => handleInputChange('productDescription', e.target.value)}
                    placeholder="תאר בקצרה את המוצר החדש"
                    className={validationErrors.has('productDescription') ? 'border-red-500 focus-visible:ring-red-500' : ''}
                  />
                  {validationErrors.has('productDescription') && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <AlertCircle className="w-4 h-4 ml-1" />
                      שדה חובה - יש למלא תיאור מוצר
                    </p>
                  )}
                </div>
                <div>
                  <Label>רמת חדשנות המוצר *</Label>
                  {renderInnovationLevel()}
                </div>
              </div>
            </CardContent>
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-4" dir="rtl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-6 h-6" />
                בעיה ופתרון
              </CardTitle>
              <CardDescription>
                תאר את הבעיה העסקית והפתרון המוצע
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <Label>תיאור הבעיה העסקית *</Label>
                  <Textarea
                    value={formData.problemDescription}
                    onChange={(e) => handleInputChange('problemDescription', e.target.value)}
                    placeholder="מה הבעיה שהמוצר פותר?"
                    className={validationErrors.has('problemDescription') ? 'border-red-500 focus-visible:ring-red-500' : ''}
                  />
                  {validationErrors.has('problemDescription') && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <AlertCircle className="w-4 h-4 ml-1" />
                      שדה חובה - יש למלא תיאור הבעיה
                    </p>
                  )}
                </div>
                <div>
                  <Label>הפתרון המוצע</Label>
                  <Textarea
                    value={formData.solution}
                    onChange={(e) => handleInputChange('solution', e.target.value)}
                    placeholder="כיצד המוצר פותר את הבעיה?"
                  />
                </div>
                <div>
                  <Label>קהל היעד</Label>
                  <Textarea
                    value={formData.targetAudience}
                    onChange={(e) => handleInputChange('targetAudience', e.target.value)}
                    placeholder="מיהו קהל היעד של המוצר?"
                  />
                </div>
              </div>
            </CardContent>
          </div>
        );
case 3:
        return (
          <div className="space-y-4" dir="rtl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart2 className="w-6 h-6" />
                מדדים ונתונים
              </CardTitle>
              <CardDescription>
                הגדר את המדדים העסקיים של המוצר
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <Label>מדדים נוכחיים</Label>
                  <Textarea
                    value={formData.currentMetrics}
                    onChange={(e) => handleInputChange('currentMetrics', e.target.value)}
                    placeholder="מהם המדדים הנוכחיים?"
                  />
                </div>
                <div>
                  <Label>מדדים עתידיים צפויים</Label>
                  <Textarea
                    value={formData.futureMetrics}
                    onChange={(e) => handleInputChange('futureMetrics', e.target.value)}
                    placeholder="מהם המדדים הצפויים לאחר השקת המוצר?"
                  />
                </div>
                <div>
                  <Label>KPIs מרכזיים</Label>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    {kpiExamples.map(kpi => (
                      <div 
                        key={kpi.id}
                        className={`p-4 border rounded-lg cursor-pointer transition-all ${
                          formData.selectedKPIs.includes(kpi.id)
                            ? 'border-primary bg-primary/10'
                            : 'hover:border-primary'
                        }`}
                        onClick={() => {
                          const updatedKPIs = formData.selectedKPIs.includes(kpi.id)
                            ? formData.selectedKPIs.filter(id => id !== kpi.id)
                            : [...formData.selectedKPIs, kpi.id];
                          handleInputChange('selectedKPIs', updatedKPIs);
                        }}
                      >
                        <div className="font-medium">{kpi.label}</div>
                        <div className="text-sm text-gray-500">{kpi.description}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4" dir="rtl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-6 h-6" />
                מידע נוסף ופרטי התקשרות
              </CardTitle>
              <CardDescription>
                הוסף מידע משלים ופרטי התקשרות
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <Label>מידע נוסף שיעזור לדייק את ה-PRFAQ</Label>
                  <Textarea
                    value={formData.additionalInfo}
                    onChange={(e) => handleInputChange('additionalInfo', e.target.value)}
                    placeholder="הוסף מידע נוסף שיכול לעזור ביצירת PRFAQ מדויק יותר"
                    className="h-32"
                  />
                </div>
                <div>
                  <Label>כתובת מייל *</Label>
                  <Input
                    type="email"
                    value={formData.userEmail}
                    onChange={(e) => handleInputChange('userEmail', e.target.value)}
                    placeholder="הזן את כתובת המייל שלך"
                    className={validationErrors.has('userEmail') ? 'border-red-500 focus-visible:ring-red-500' : ''}
                  />
                  {validationErrors.has('userEmail') && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <AlertCircle className="w-4 h-4 ml-1" />
                      שדה חובה - יש להזין כתובת מייל
                    </p>
                  )}
                </div>
                {formData.productInnovationLevel >= 2 && (
                  <div>
                    <Label>פרטי איש קשר עסקי</Label>
                    <Input
                      value={formData.businessContact}
                      onChange={(e) => handleInputChange('businessContact', e.target.value)}
                      placeholder="שם ותפקיד של איש הקשר העסקי"
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </div>
        );
    }
  };

  const progressPercentage = (step / totalSteps) * 100;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Card>
        <div className="p-6">
          <Progress value={progressPercentage} className="mb-6" />
          {renderStep()}
          <div className="flex justify-between mt-6" dir="rtl">
            {step > 1 && (
              <Button onClick={handleBack} variant="outline">
                חזור
              </Button>
            )}
            <div className="flex-1" />
            {step < totalSteps ? (
              <Button onClick={handleNext}>
                המשך
              </Button>
            ) : (
              <Button 
                disabled={isLoading}
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
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <svg className="animate-spin h-4 w-4 ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    יוצר מסמכים...
                  </div>
                ) : (
                  <>
                    <Mail className="w-4 h-4 ml-2" />
                    שלח ויצר PRFAQ
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PRFAQForm;
