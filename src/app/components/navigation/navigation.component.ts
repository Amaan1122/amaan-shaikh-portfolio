import {
  Component,
  HostListener,
  OnInit,
  ChangeDetectionStrategy,
  signal,
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
} from '@angular/animations';
import {
  LucideAngularModule,
  Menu,
  X,
  Home,
  User,
  Briefcase,
  Code,
  MessageSquare,
} from 'lucide-angular';
import { ButtonComponent } from '../ui/button/button.component';

interface NavItem {
  label: string;
  href: string;
  icon: any;
}

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule, ButtonComponent, LucideAngularModule],
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('slideDown', [
      transition(':enter', [
        style({ transform: 'translateY(-100px)', opacity: 0 }),
        animate(
          '300ms ease-out',
          style({ transform: 'translateY(0)', opacity: 1 })
        ),
      ]),
    ]),
    trigger('fadeInSlide', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-20px)' }),
        animate(
          '300ms 200ms ease-out',
          style({ opacity: 1, transform: 'translateX(0)' })
        ),
      ]),
    ]),
    trigger('staggerIn', [
      transition('* => *', [
        query(
          ':enter',
          [
            style({ opacity: 0, transform: 'translateY(-20px)' }),
            stagger('100ms', [
              animate(
                '300ms ease-out',
                style({ opacity: 1, transform: 'translateY(0)' })
              ),
            ]),
          ],
          { optional: true }
        ),
      ]),
    ]),
    trigger('mobileMenuSlide', [
      state('closed', style({ opacity: 0, height: '0px', overflow: 'hidden' })),
      state('open', style({ opacity: 1, height: '*', overflow: 'visible' })),
      transition('closed <=> open', animate('300ms ease-in-out')),
    ]),
    trigger('floatingButton', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(50px)' }),
        animate(
          '300ms 1000ms ease-out',
          style({ opacity: 1, transform: 'translateX(0)' })
        ),
      ]),
    ]),
  ],
})
export class NavigationComponent implements OnInit {
  isScrolled = signal(false);
  isMobileMenuOpen = signal(false);

  // Expose icons for template
  readonly Menu = Menu;
  readonly X = X;
  readonly Home = Home;
  readonly User = User;
  readonly Briefcase = Briefcase;
  readonly Code = Code;
  readonly MessageSquare = MessageSquare;

  navItems: NavItem[] = [
    { label: 'Home', href: '#home', icon: Home },
    { label: 'About', href: '#about', icon: User },
    { label: 'Projects', href: '#projects', icon: Briefcase },
    { label: 'Skills', href: '#skills', icon: Code },
    { label: 'Contact', href: '#contact', icon: MessageSquare },
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    // Only check scroll if running in browser
    if (isPlatformBrowser(this.platformId)) {
      this.checkScroll();
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    // Only handle scroll if running in browser
    if (isPlatformBrowser(this.platformId)) {
      this.checkScroll();
    }
  }

  private checkScroll(): void {
    // Additional safety check
    if (isPlatformBrowser(this.platformId) && typeof window !== 'undefined') {
      this.isScrolled.set(window.scrollY > 50);
    }
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen.update((isOpen) => !isOpen);
  }

  scrollToSection(href: string): void {
    // Only scroll if running in browser
    if (isPlatformBrowser(this.platformId) && typeof document !== 'undefined') {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    this.isMobileMenuOpen.set(false);
  }

  getNavClasses(): string {
    return this.isScrolled()
      ? 'fixed top-0 left-0 right-0 z-50 transition-all duration-300 glass-effect shadow-2xl'
      : 'fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-transparent';
  }

  trackByLabel(index: number, item: NavItem): string {
    return item.label;
  }
}
