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
  Code,
  Zap,
  Globe,
  Brain,
  Users,
  Award,
} from 'lucide-angular';
import { BadgeComponent } from '../ui/badge/badge.component';
import { CardComponent } from '../ui/card/card.component';

interface Technology {
  name: string;
  color: string;
  level: number;
}

interface Stat {
  icon: any;
  value: string;
  label: string;
  color: string;
}

@Component({
  selector: 'app-about-section',
  standalone: true,
  imports: [CommonModule, BadgeComponent, CardComponent, LucideAngularModule],
  templateUrl: './about-section.component.html',
  styleUrls: ['./about-section.component.scss'],
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
    trigger('hoverScale', [
      transition(':enter', [
        style({ transform: 'scale(1)' }),
        animate(
          '200ms ease-out',
          style({ transform: 'scale(1.05) translateY(-5px)' })
        ),
      ]),
      transition(':leave', [
        animate(
          '200ms ease-out',
          style({ transform: 'scale(1) translateY(0)' })
        ),
      ]),
    ]),
  ],
})
export class AboutSectionComponent implements OnInit, OnDestroy {
  @ViewChild('sectionRef', { static: true }) sectionRef!: ElementRef;

  isInView = signal(false);
  hoveredTech = signal<string | null>(null);

  // Expose icons for template
  readonly Code = Code;
  readonly Zap = Zap;
  readonly Globe = Globe;
  readonly Brain = Brain;
  readonly Users = Users;
  readonly Award = Award;

  technologies: Technology[] = [
    { name: 'Angular', color: 'from-red-500 to-red-600', level: 80 },
    { name: '.NET Core', color: 'from-blue-500 to-blue-600', level: 70 },
    { name: 'TypeScript', color: 'from-blue-400 to-blue-500', level: 80 },
    { name: 'SQL Server', color: 'from-orange-500 to-orange-600', level: 80 },
    { name: 'HTML5/CSS3', color: 'from-cyan-500 to-cyan-600', level: 85 },
    { name: 'RxJS', color: 'from-pink-500 to-pink-600', level: 75 },
    { name: 'Agile', color: 'from-blue-600 to-blue-700', level: 65 },
    { name: 'Rest APIs', color: 'from-red-500 to-red-600', level: 70 },
    { name: 'GitHub', color: 'from-orange-500 to-orange-600', level: 75 },
    { name: 'CI/CD', color: 'from-cyan-500 to-cyan-600', level: 70 },
  ];

  stats: Stat[] = [
    {
      icon: Code,
      value: '3+',
      label: 'Years Experience',
      color: 'text-primary',
    },
    {
      icon: Globe,
      value: '15+',
      label: 'Projects Delivered',
      color: 'text-cyan-400',
    },
    {
      icon: Users,
      value: '10+',
      label: 'Happy Clients',
      color: 'text-green-400',
    },
    {
      icon: Award,
      value: '100%',
      label: 'Success Rate',
      color: 'text-yellow-400',
    },
  ];

  skills: string[] = [
    'Innovation',
    'Problem Solving',
    'Team Collaboration',
    'Continuous Learning',
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

  onTechHover(techName: string): void {
    this.hoveredTech.set(techName);
  }

  onTechLeave(): void {
    this.hoveredTech.set(null);
  }

  getTechProgressStyles(tech: Technology): any {
    return {
      width: this.hoveredTech() === tech.name ? `${tech.level}%` : '0%',
      transition: 'width 0.8s ease-out',
    };
  }

  getTechBarStyles(tech: Technology, index: number): any {
    return {
      width: this.isInView() ? `${tech.level}%` : '0%',
      transition: `width 1s ease-out`,
      transitionDelay: `${index * 0.1}s`,
    };
  }

  trackByTechName(index: number, tech: Technology): string {
    return tech.name;
  }

  trackByStatLabel(index: number, stat: Stat): string {
    return stat.label;
  }

  trackBySkill(index: number, skill: string): string {
    return skill;
  }

  getAnimationState(): string {
    return this.isInView() ? 'visible' : 'hidden';
  }
}
