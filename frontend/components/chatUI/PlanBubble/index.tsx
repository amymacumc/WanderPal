"use client"
import React from 'react';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { Card } from '@/components/ui/card';
import PlanOverview from '@/components/PlanOverview';
import { travelOverview } from '../type';
interface PlanBubbleProps {
    planList: travelOverview[];
}

const PlanBubble: React.FC<PlanBubbleProps> = ({ planList }) => {
    return (
        <Carousel>
            <CarouselContent>
                {
                    planList.map((plan, index) => 
                        <CarouselItem key={index} className='basis-72'>
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