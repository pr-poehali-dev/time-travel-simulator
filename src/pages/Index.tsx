import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface Wish {
  id: number;
  text: string;
  granted: boolean;
  energy: number;
}

interface Discovery {
  id: number;
  name: string;
  description: string;
  era: string;
  impact: number;
}

interface TimePeriod {
  id: string;
  name: string;
  description: string;
  icon: string;
  discoveries: number;
}

const Index = () => {
  const [currentWish, setCurrentWish] = useState('');
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [cosmicEnergy, setCosmicEnergy] = useState(100);
  const [selectedEra, setSelectedEra] = useState('present');
  const [discoveries, setDiscoveries] = useState<Discovery[]>([
    {
      id: 1,
      name: 'Квантовый резонатор',
      description: 'Устройство для усиления желаний через квантовые флуктуации',
      era: 'future',
      impact: 85
    },
    {
      id: 2,
      name: 'Временная спираль',
      description: 'Древний артефакт для стабилизации временных парадоксов',
      era: 'ancient',
      impact: 92
    }
  ]);

  const timePeriods: TimePeriod[] = [
    {
      id: 'ancient',
      name: 'Древние цивилизации',
      description: 'Эпоха магии и артефактов',
      icon: 'Castle',
      discoveries: 3
    },
    {
      id: 'present',
      name: 'Современность',
      description: 'Эра технологий и науки',
      icon: 'Building',
      discoveries: 5
    },
    {
      id: 'future',
      name: 'Далёкое будущее',
      description: 'Время квантовых технологий',
      icon: 'Rocket',
      discoveries: 7
    }
  ];

  const planets = [
    { name: 'Земля', type: 'Родной мир', resources: 'Жизнь, Вода', icon: 'Globe' },
    { name: 'Кеплер-442b', type: 'Экзопланета', resources: 'Кристаллы времени', icon: 'Sparkles' },
    { name: 'Проксима b', type: 'Исследуемая', resources: 'Энергетические руды', icon: 'Zap' }
  ];

  const makeWish = () => {
    if (currentWish.trim() && cosmicEnergy >= 10) {
      const newWish: Wish = {
        id: Date.now(),
        text: currentWish,
        granted: Math.random() > 0.3,
        energy: Math.floor(Math.random() * 50) + 10
      };

      setWishes(prev => [newWish, ...prev]);
      setCosmicEnergy(prev => Math.max(0, prev - 10));
      setCurrentWish('');

      if (newWish.granted) {
        setTimeout(() => {
          setCosmicEnergy(prev => Math.min(100, prev + newWish.energy));
        }, 1000);
      }
    }
  };

  const travelToEra = (eraId: string) => {
    setSelectedEra(eraId);
    setCosmicEnergy(prev => Math.max(0, prev - 5));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCosmicEnergy(prev => Math.min(100, prev + 1));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen cosmic-gradient p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center py-8">
          <h1 className="text-5xl font-bold text-white mb-4 cosmic-glow">
            ⚡ Орбитрон: Симулятор Времени
          </h1>
          <p className="text-purple-200 text-lg">
            Путешествуй сквозь эпохи, исследуй планеты, загадывай желания
          </p>
          <div className="mt-4 flex items-center justify-center space-x-4">
            <Badge variant="secondary" className="text-lg px-4 py-2">
              <Icon name="Zap" size={16} className="mr-2" />
              Космическая энергия: {cosmicEnergy}%
            </Badge>
            <Progress value={cosmicEnergy} className="w-32 h-3" />
          </div>
        </div>

        <Tabs defaultValue="wishes" className="space-y-6">
          <TabsList className="grid grid-cols-4 w-full bg-purple-900/50 border-purple-500">
            <TabsTrigger value="wishes" className="text-white">
              <Icon name="Star" size={16} className="mr-2" />
              Желания
            </TabsTrigger>
            <TabsTrigger value="travel" className="text-white">
              <Icon name="Clock" size={16} className="mr-2" />
              Путешествия
            </TabsTrigger>
            <TabsTrigger value="planets" className="text-white">
              <Icon name="Globe" size={16} className="mr-2" />
              Планеты
            </TabsTrigger>
            <TabsTrigger value="discoveries" className="text-white">
              <Icon name="Telescope" size={16} className="mr-2" />
              Открытия
            </TabsTrigger>
          </TabsList>

          {/* Система желаний */}
          <TabsContent value="wishes" className="space-y-6">
            <Card className="bg-purple-900/30 border-purple-500 cosmic-glow">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Icon name="Sparkles" size={24} className="mr-2 text-yellow-400" />
                  Загадать желание
                </CardTitle>
                <CardDescription className="text-purple-200">
                  Используй космическую энергию для исполнения желаний
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex space-x-2">
                  <Input
                    value={currentWish}
                    onChange={(e) => setCurrentWish(e.target.value)}
                    placeholder="Введи своё желание..."
                    className="flex-1 bg-purple-800/50 border-purple-400 text-white"
                    onKeyPress={(e) => e.key === 'Enter' && makeWish()}
                  />
                  <Button 
                    onClick={makeWish} 
                    disabled={cosmicEnergy < 10 || !currentWish.trim()}
                    className="nebula-gradient energy-glow"
                  >
                    <Icon name="Wand2" size={16} className="mr-2" />
                    Загадать
                  </Button>
                </div>
                
                <div className="grid gap-3 max-h-80 overflow-y-auto">
                  {wishes.map((wish) => (
                    <Card key={wish.id} className={`${wish.granted ? 'bg-green-900/30 border-green-500' : 'bg-red-900/30 border-red-500'}`}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <span className="text-white">{wish.text}</span>
                          <div className="flex items-center space-x-2">
                            {wish.granted ? (
                              <Badge className="bg-green-500">
                                <Icon name="Check" size={12} className="mr-1" />
                                Исполнено
                              </Badge>
                            ) : (
                              <Badge variant="destructive">
                                <Icon name="X" size={12} className="mr-1" />
                                Ожидает
                              </Badge>
                            )}
                            <span className="text-purple-200">+{wish.energy}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Путешествия во времени */}
          <TabsContent value="travel" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-4">
              {timePeriods.map((period) => (
                <Card 
                  key={period.id} 
                  className={`cursor-pointer transition-all duration-300 ${
                    selectedEra === period.id 
                      ? 'bg-purple-800/50 border-purple-400 cosmic-glow' 
                      : 'bg-purple-900/30 border-purple-600 hover:border-purple-400'
                  }`}
                  onClick={() => travelToEra(period.id)}
                >
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Icon name={period.icon as any} size={24} className="mr-2" />
                      {period.name}
                    </CardTitle>
                    <CardDescription className="text-purple-200">
                      {period.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Badge variant="secondary">
                      {period.discoveries} открытий доступно
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Планеты */}
          <TabsContent value="planets" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-4">
              {planets.map((planet, index) => (
                <Card key={index} className="bg-purple-900/30 border-purple-500 hover:cosmic-glow transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Icon name={planet.icon as any} size={24} className="mr-2" />
                      {planet.name}
                    </CardTitle>
                    <CardDescription className="text-purple-200">
                      {planet.type}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-purple-200 mb-3">Ресурсы: {planet.resources}</p>
                    <Button className="w-full nebula-gradient">
                      <Icon name="Rocket" size={16} className="mr-2" />
                      Исследовать
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Научные открытия */}
          <TabsContent value="discoveries" className="space-y-6">
            <div className="grid gap-4">
              {discoveries.map((discovery) => (
                <Card key={discovery.id} className="bg-purple-900/30 border-purple-500">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center justify-between">
                      <span className="flex items-center">
                        <Icon name="Atom" size={24} className="mr-2 text-blue-400" />
                        {discovery.name}
                      </span>
                      <Badge variant="outline" className="text-purple-200">
                        {discovery.era}
                      </Badge>
                    </CardTitle>
                    <CardDescription className="text-purple-200">
                      {discovery.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <span className="text-purple-200">Влияние на реальность:</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={discovery.impact} className="w-24 h-2" />
                        <span className="text-white">{discovery.impact}%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;