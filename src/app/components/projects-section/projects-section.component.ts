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
  url: string;
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
      image: 'assets/projects/TalentMatchAi.png',
      technologies: [
        'Angular',
        'TypeScript',
        '.NET Core',
        'OpenAI',
        'Azure ML',
        'SQL Server',
        'Docker',
      ],
      featured: false,
      stats: { stars: 128, users: '2.5k', year: '2025' },
      category: 'AI/ML',
      url: '',
    },
    {
      title: 'SHHHTOSHI - TON-Based Staking & Rewards dApp',
      description:
        'SHHHTOSHI is a decentralized staking and rewards platform built on the TON blockchain. The project features a web-based and Telegram Mini App interface, allowing users to stake tokens, earn rewards, complete tasks, and refer others to earn points.',
      image: 'assets/projects/ShhhToshi.png',
      technologies: [
        '.NET Core',
        'Angular',
        'RxJS',
        'SignalR',
        'Entity Framework Core',
        'SQL Server',
        'REST API Design',
        'Telegram Integration',
        'Blockchain',
      ],
      featured: false,
      stats: { stars: 89, users: '1k', year: '2025' },
      category: 'Blockchain',
      url: 'https://shhh-toshi-app-frontend.vercel.app/',
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
      Blockchain: 'from-red-500 to-orange-500',
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
