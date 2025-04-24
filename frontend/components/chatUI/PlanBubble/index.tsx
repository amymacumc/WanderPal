"use client"
import React from 'react';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { planOverview } from '@/types/user';
import PlanOverview from '@/components/PlanOverview';
interface PlanBubbleProps {
    planList: planOverview[];
}

const PlanBubble: React.FC<PlanBubbleProps> = ({ planList }) => {
    return (
        <Carousel>
            <CarouselContent>
                {
                    planList.map((plan, index) => 
                        <CarouselItem key={index} className='basis-1/2'>
                            <Card>
                                <PlanOverview {...plan} />
                            </Card>
                        </CarouselItem>
                    )
                }
            </CarouselContent>
        </Carousel>
    )
}

export default PlanBubble;