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
  ExternalLink,
  Github,
  Play,
  Star,
  Calendar,
  Users,
} from 'lucide-angular';
import { ButtonComponent } from '../ui/button/button.component';
import {
  CardComponent,
  CardHeaderComponent,
  CardTitleComponent,
  CardDescriptionComponent,
  CardContentComponent,
} from '../ui/card/cards';
import { BadgeComponent } from '..//ui/badge/badge.component';
import { ImageWithFallbackComponent } from '../figma/image-with-fallback/image-with-fallback.component';

interface Project {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  featured: boolean;
  stats: {
    stars: number;
    users: string;
    year: string;
  };
  category: string;
}

@Component({
  selector: 'app-projects-section',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    CardComponent,
    CardHeaderComponent,
    CardTitleComponent,
    CardDescriptionComponent,
    CardContentComponent,
    BadgeComponent,
    ImageWithFallbackComponent,
    LucideAngularModule,
  ],
  templateUrl: './projects-section.component.html',
  styleUrls: ['./projects-section.component.scss'],
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
  ],
})
export class ProjectsSectionComponent implements OnInit, OnDestroy {
  @ViewChild('sectionRef', { static: true }) sectionRef!: ElementRef;

  isInView = signal(false);
  hoveredProject = signal<number | null>(null);

  // Expose icons for template
  readonly ExternalLink = ExternalLink;
  readonly Github = Github;
  readonly Play = Play;
  readonly Star = Star;
  readonly Calendar = Calendar;
  readonly Users = Users;

  projects: Project[] = [
    {
      title: 'TalentMatch AI',
      description:
        'Revolutionary AI-powered recruitment platform that transforms how companies discover and connect with top talent. Features advanced machine learning algorithms for intelligent candidate matching, automated resume analysis, and predictive hiring analytics.',
      image:
        'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop',
      technologies: [
        'Angular',
        'TypeScript',
        '.NET Core',
        'OpenAI',
        'Azure ML',
        'SQL Server',
        'Docker',
      ],
      featured: true,
      stats: { stars: 128, users: '2.5k', year: '2024' },
      category: 'AI/ML',
    },
    {
      title: 'CyberShield Dashboard',
      description:
        'Next-generation cybersecurity monitoring platform with real-time threat detection, advanced analytics, and automated response systems. Built for enterprise-level security operations.',
      image:
        'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop',
      technologies: [
        'Angular',
        'RxJS',
        '.NET 8',
        'SignalR',
        'Redis',
        'PostgreSQL',
      ],
      featured: false,
      stats: { stars: 89, users: '850', year: '2024' },
      category: 'Security',
    },
    {
      title: 'HealthTech Portal',
      description:
        'Comprehensive healthcare management ecosystem with telemedicine capabilities, patient records management, appointment scheduling, and AI-assisted diagnosis support.',
      image:
        'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&h=400&fit=crop',
      technologies: [
        'Angular',
        'TypeScript',
        '.NET Core',
        'Azure',
        'FHIR',
        'WebRTC',
      ],
      featured: false,
      stats: { stars: 156, users: '1.2k', year: '2023' },
      category: 'Healthcare',
    },
    {
      title: 'FinanceFlow Analytics',
      description:
        'Advanced financial analytics platform with real-time market data, portfolio optimization, risk assessment algorithms, and intelligent trading recommendations.',
      image:
        'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=400&fit=crop',
      technologies: [
        'Angular',
        '.NET',
        'ML.NET',
        'Azure Functions',
        'CosmosDB',
        'Power BI',
      ],
      featured: false,
      stats: { stars: 203, users: '3.1k', year: '2023' },
      category: 'FinTech',
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

  onProjectHover(index: number): void {
    this.hoveredProject.set(index);
  }

  onProjectLeave(): void {
    this.hoveredProject.set(null);
  }

  getCategoryColor(category: string): string {
    const colors: Record<string, string> = {
      'AI/ML': 'from-purple-500 to-pink-500',
      Security: 'from-red-500 to-orange-500',
      Healthcare: 'from-green-500 to-teal-500',
      FinTech: 'from-blue-500 to-cyan-500',
    };
    return colors[category] || 'from-gray-500 to-gray-600';
  }

  getOverlayOpacity(index: number): number {
    return this.hoveredProject() === index ? 1 : 0;
  }

  getStatsTransform(index: number): string {
    return this.hoveredProject() === index
      ? 'translateY(0)'
      : 'translateY(20px)';
  }

  getStatsOpacity(index: number): number {
    return this.hoveredProject() === index ? 1 : 0;
  }

  getAnimationState(): string {
    return this.isInView() ? 'visible' : 'hidden';
  }

  trackByIndex(index: number): number {
    return index;
  }

  trackByTech(index: number, tech: string): string {
    return tech;
  }
}
