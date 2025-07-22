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
  Code2,
  Database,
  Cloud,
  Brain,
  Zap,
  Star,
} from 'lucide-angular';
import { ProgressComponent } from '../ui/progress/progress.component';
import {
  CardComponent,
  CardHeaderComponent,
  CardTitleComponent,
  CardContentComponent,
} from '../ui/card/cards';
import { BadgeComponent } from '../ui/badge/badge.component';

interface Skill {
  name: string;
  level: number;
  color: string;
}

interface SkillCategory {
  title: string;
  icon: any;
  color: string;
  bgGlow: string;
  skills: Skill[];
}

interface StatItem {
  label: string;
  value: string;
  icon: any;
  color: string;
}

@Component({
  selector: 'app-skills-section',
  standalone: true,
  imports: [
    CommonModule,
    ProgressComponent,
    CardComponent,
    CardHeaderComponent,
    CardTitleComponent,
    CardContentComponent,
    BadgeComponent,
    LucideAngularModule,
  ],
  templateUrl: './skills-section.component.html',
  styleUrls: ['./skills-section.component.scss'],
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
export class SkillsSectionComponent implements OnInit, OnDestroy {
  @ViewChild('sectionRef', { static: true }) sectionRef!: ElementRef;

  isInView = signal(false);
  hoveredCategory = signal<number | null>(null);

  // Expose icons for template
  readonly Code2 = Code2;
  readonly Database = Database;
  readonly Cloud = Cloud;
  readonly Brain = Brain;
  readonly Zap = Zap;
  readonly Star = Star;

  skillCategories: SkillCategory[] = [
    {
      title: 'Frontend Development',
      icon: Code2,
      color: 'from-blue-500 to-cyan-500',
      bgGlow: 'bg-blue-500/10',
      skills: [
        { name: 'Angular', level: 95, color: 'bg-red-500' },
        { name: 'TypeScript', level: 90, color: 'bg-blue-500' },
        { name: 'RxJS', level: 85, color: 'bg-purple-500' },
        { name: 'HTML/CSS', level: 92, color: 'bg-orange-500' },
      ],
    },
    {
      title: 'Backend Development',
      icon: Database,
      color: 'from-green-500 to-emerald-500',
      bgGlow: 'bg-green-500/10',
      skills: [
        { name: 'C# / .NET Core', level: 93, color: 'bg-blue-600' },
        { name: 'REST APIs', level: 88, color: 'bg-green-500' },
        { name: 'Entity Framework', level: 85, color: 'bg-purple-600' },
        { name: 'Microservices', level: 80, color: 'bg-indigo-500' },
      ],
    },
    {
      title: 'Database & Cloud',
      icon: Cloud,
      color: 'from-purple-500 to-pink-500',
      bgGlow: 'bg-purple-500/10',
      skills: [
        { name: 'SQL Server', level: 90, color: 'bg-red-600' },
        { name: 'Azure', level: 82, color: 'bg-blue-400' },
        { name: 'Git / GitHub', level: 95, color: 'bg-gray-600' },
        { name: 'Docker', level: 75, color: 'bg-blue-500' },
      ],
    },
    {
      title: 'AI & Analytics',
      icon: Brain,
      color: 'from-orange-500 to-red-500',
      bgGlow: 'bg-orange-500/10',
      skills: [
        { name: 'AI Integration', level: 78, color: 'bg-purple-500' },
        { name: 'Machine Learning', level: 70, color: 'bg-green-500' },
        { name: 'Data Analysis', level: 85, color: 'bg-blue-500' },
        { name: 'Power BI', level: 80, color: 'bg-yellow-500' },
      ],
    },
  ];

  statsData: StatItem[] = [
    {
      label: 'Years Experience',
      value: '3+',
      icon: Star,
      color: 'text-yellow-400',
    },
    {
      label: 'Technologies',
      value: '15+',
      icon: Code2,
      color: 'text-blue-400',
    },
    {
      label: 'Frameworks',
      value: '8+',
      icon: Database,
      color: 'text-green-400',
    },
    {
      label: 'Certifications',
      value: '5+',
      icon: Brain,
      color: 'text-purple-400',
    },
  ];

  additionalTools: string[] = [
    'Visual Studio',
    'VS Code',
    'Postman',
    'Figma',
    'Jira',
    'Confluence',
    'Jenkins',
    'Kubernetes',
    'Redis',
    'MongoDB',
    'SignalR',
    'GraphQL',
    'Blazor',
    'Entity Framework',
    'LINQ',
    'AutoMapper',
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

  onCategoryHover(index: number): void {
    this.hoveredCategory.set(index);
  }

  onCategoryLeave(): void {
    this.hoveredCategory.set(null);
  }

  getBgGlowOpacity(index: number): number {
    return this.hoveredCategory() === index ? 0.1 : 0;
  }

  getSkillProgressWidth(skill: Skill): string {
    return this.isInView() ? `${skill.level}%` : '0%';
  }

  getSkillAnimationDelay(categoryIndex: number, skillIndex: number): string {
    return `${categoryIndex * 0.2 + skillIndex * 0.1}s`;
  }

  getToolAnimationDelay(index: number): string {
    return `${index * 0.05}s`;
  }

  getAnimationState(): string {
    return this.isInView() ? 'visible' : 'hidden';
  }

  trackByCategoryIndex(index: number): number {
    return index;
  }

  trackBySkillName(index: number, skill: Skill): string {
    return skill.name;
  }

  trackByStatLabel(index: number, stat: StatItem): string {
    return stat.label;
  }

  trackByTool(index: number, tool: string): string {
    return tool;
  }
}
