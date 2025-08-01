import { Component, ElementRef, ViewChild } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { CommonModule } from '@angular/common';
import { CardComponent, CardContentComponent } from '../ui/card/cards';

import {
  LucideAngularModule,
  Star,
  Quote,
  Users,
  Award,
  MessageCircle,
} from 'lucide-angular';
import { ImageWithFallbackComponent } from '../figma/image-with-fallback/image-with-fallback.component';
import { ButtonComponent } from '../ui/button/button.component';

interface Testimonial {
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  avatar: string;
  projectType: string;
  duration: string;
  highlight: string;
}

interface Stat {
  label: string;
  value: string;
  icon: any;
  color: string;
}

@Component({
  selector: 'app-testimonials-section',
  standalone: true,
  imports: [
    CommonModule,
    CardComponent,
    CardContentComponent,
    LucideAngularModule,
    ImageWithFallbackComponent,
    ButtonComponent
  ],
  templateUrl: './testimonials-section.component.html',
  styleUrls: ['./testimonials-section.component.scss'],
  animations: [
    trigger('containerAnim', [
      state('hidden', style({ opacity: 0 })),
      state('visible', style({ opacity: 1 })),
      transition('hidden => visible', [
        animate('600ms cubic-bezier(.7,0,.3,1)'),
      ]),
    ]),
    trigger('itemAnim', [
      state('hidden', style({ opacity: 0, transform: 'translateY(50px)' })),
      state('visible', style({ opacity: 1, transform: 'none' })),
      transition('hidden => visible', [
        animate('600ms cubic-bezier(.7,0,.3,1)'),
      ]),
    ]),
    trigger('cardAnim', [
      state('hidden', style({ opacity: 0, transform: 'scale(0.8)' })),
      state('visible', style({ opacity: 1, transform: 'scale(1)' })),
      transition('hidden => visible', [
        animate('450ms cubic-bezier(.7,0,.3,1)'),
      ]),
    ]),
    // ... more, as needed for hover
  ],
})
export class TestimonialsSectionComponent {
  hoveredCard: number | null = null;

  // Expose icons for template
  readonly Star = Star;
  readonly Quote = Quote;
  readonly Users = Users;
  readonly Award = Award;
  readonly MessageCircle = MessageCircle;

  testimonials: Testimonial[] = [
    // ...same as in your original React code
    {
      name: 'Sarah Johnson',
      role: 'CTO',
      company: 'TechStart Inc.',
      content:
        'Amaan delivered exceptional work on our enterprise web application. His expertise in Angular and .NET helped us achieve our goals ahead of schedule. Highly professional and communicative throughout the project.',
      rating: 5,
      avatar:
        'https://images.unsplash.com/photo-1494790108755-2616c96c1c88?w=150&h=150&fit=crop&crop=face',
      projectType: 'Enterprise Web App',
      duration: '3 months',
      highlight: 'Delivered 2 weeks early',
    },
    {
      name: 'Michael Chen',
      role: 'Product Manager',
      company: 'InnovateLabs',
      content:
        'Working with Amaan was a game-changer for our project. His AI integration skills and full-stack expertise helped us build a sophisticated platform that exceeded our expectations. Would definitely work with him again.',
      rating: 5,
      avatar:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      projectType: 'AI Integration Platform',
      duration: '4 months',
      highlight: 'Exceeded expectations',
    },
    {
      name: 'Emily Rodriguez',
      role: 'Founder',
      company: 'Healthcare Solutions',
      content:
        "Amaan's attention to detail and technical proficiency in building our healthcare management system was outstanding. He understood our requirements perfectly and delivered a robust, scalable solution.",
      rating: 5,
      avatar:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      projectType: 'Healthcare Management',
      duration: '5 months',
      highlight: 'Scalable solution',
    },
  ];

  stats: Stat[] = [
    {
      label: 'Happy Clients',
      value: '50+',
      icon: Users,
      color: 'text-blue-400',
    },
    {
      label: 'Projects Completed',
      value: '75+',
      icon: Award,
      color: 'text-green-400',
    },
    {
      label: 'Average Rating',
      value: '4.9/5',
      icon: Star,
      color: 'text-yellow-400',
    },
    {
      label: 'Client Retention',
      value: '95%',
      icon: MessageCircle,
      color: 'text-purple-400',
    },
  ];

  inView = false;

  @ViewChild('observeRef', { static: true }) observeRef!: ElementRef;

  ngAfterViewInit() {
    const observer = new IntersectionObserver(
      (entries) => {
        this.inView = entries[0].isIntersecting;
      },
      { rootMargin: '-100px', threshold: 0.1 }
    );
    observer.observe(this.observeRef.nativeElement);
  }

  onCardMouseEnter(idx: number) {
    this.hoveredCard = idx;
  }

  onCardMouseLeave() {
    this.hoveredCard = null;
  }
}
