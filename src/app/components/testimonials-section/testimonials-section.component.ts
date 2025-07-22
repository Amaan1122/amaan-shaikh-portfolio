import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  signal,
  ViewChild,
  ElementRef,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  trigger,
  state,
  style,
  transition,
  animate,
  query,
  stagger,
  keyframes,
} from '@angular/animations';
import {
  LucideAngularModule,
  Star,
  Quote,
  Users,
  Award,
  MessageCircle,
} from 'lucide-angular';
import { CardComponent, CardContentComponent } from '../ui/card/cards';
import { BadgeComponent } from '../ui/badge/badge.component';
import { ImageWithFallbackComponent } from '../figma/image-with-fallback/image-with-fallback.component';

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

interface StatItem {
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
    BadgeComponent,
    ImageWithFallbackComponent,
    LucideAngularModule,
  ],
  templateUrl: './testimonials-section.component.html',
  styleUrls: ['./testimonials-section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('containerAnimation', [
      state('hidden', style({ opacity: 0 })),
      state('visible', style({ opacity: 1 })),
      transition('hidden => visible', [
        animate('300ms 300ms ease-out', style({ opacity: 1 })),
        query(
          ':enter',
          [
            style({ transform: 'translateY(50px)', opacity: 0 }),
            stagger('100ms', [
              animate(
                '600ms ease-out',
                keyframes([
                  style({
                    transform: 'translateY(50px)',
                    opacity: 0,
                    offset: 0,
                  }),
                  style({
                    transform: 'translateY(-10px)',
                    opacity: 0.8,
                    offset: 0.7,
                  }),
                  style({ transform: 'translateY(0)', opacity: 1, offset: 1 }),
                ])
              ),
            ]),
          ],
          { optional: true }
        ),
      ]),
    ]),
    trigger('itemAnimation', [
      transition(':enter', [
        style({ transform: 'translateY(50px)', opacity: 0 }),
        animate(
          '600ms ease-out',
          keyframes([
            style({ transform: 'translateY(50px)', opacity: 0, offset: 0 }),
            style({
              transform: 'translateY(-10px)',
              opacity: 0.8,
              offset: 0.7,
            }),
            style({ transform: 'translateY(0)', opacity: 1, offset: 1 }),
          ])
        ),
      ]),
    ]),
    trigger('cardAnimation', [
      transition(':enter', [
        style({ transform: 'scale(0.8)', opacity: 0 }),
        animate(
          '600ms ease-out',
          keyframes([
            style({ transform: 'scale(0.8)', opacity: 0, offset: 0 }),
            style({ transform: 'scale(1.05)', opacity: 0.8, offset: 0.7 }),
            style({ transform: 'scale(1)', opacity: 1, offset: 1 }),
          ])
        ),
      ]),
    ]),
  ],
})
export class TestimonialsSectionComponent implements OnInit, OnDestroy {
  @ViewChild('sectionRef', { static: true }) sectionRef!: ElementRef;

  isInView = signal(false);
  hoveredCard = signal<number | null>(null);

  // Expose icons for template
  readonly Star = Star;
  readonly Quote = Quote;
  readonly Users = Users;
  readonly Award = Award;
  readonly MessageCircle = MessageCircle;

  testimonials: Testimonial[] = [
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

  stats: StatItem[] = [
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

  private intersectionObserver?: IntersectionObserver;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.setupIntersectionObserver();
    }
  }

  ngOnDestroy(): void {
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
    }
  }

  private setupIntersectionObserver(): void {
    if (
      typeof IntersectionObserver !== 'undefined' &&
      this.sectionRef?.nativeElement
    ) {
      this.intersectionObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              this.isInView.set(true);
            }
          });
        },
        {
          threshold: 0.1,
          rootMargin: '-100px',
        }
      );

      this.intersectionObserver.observe(this.sectionRef.nativeElement);
    }
  }

  onCardHover(index: number): void {
    this.hoveredCard.set(index);
  }

  onCardLeave(): void {
    this.hoveredCard.set(null);
  }

  getHoverBackgroundOpacity(index: number): number {
    return this.hoveredCard() === index ? 1 : 0;
  }

  getQuoteIconScale(index: number): number {
    return this.hoveredCard() === index ? 1.2 : 1;
  }

  getQuoteIconRotate(index: number): number {
    return this.hoveredCard() === index ? 10 : 0;
  }

  getAnimationState(): string {
    return this.isInView() ? 'visible' : 'hidden';
  }

  getRatingArray(rating: number): number[] {
    return Array.from({ length: rating }, (_, i) => i);
  }

  getStarAnimationDelay(starIndex: number): string {
    return `${starIndex * 0.1}s`;
  }

  getTestimonialAnimationDelay(index: number, offset: number): string {
    return `${index * 0.1 + offset}s`;
  }

  shouldAnimateStars(cardIndex: number): boolean {
    return this.hoveredCard() === cardIndex;
  }

  scrollToContact(): void {
    if (isPlatformBrowser(this.platformId) && typeof document !== 'undefined') {
      const element = document.querySelector('#contact');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }

  trackByTestimonialName(index: number, testimonial: Testimonial): string {
    return testimonial.name;
  }

  trackByStatLabel(index: number, stat: StatItem): string {
    return stat.label;
  }

  trackByIndex(index: number): number {
    return index;
  }
}
