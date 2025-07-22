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
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
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
  Mail,
  Github,
  Linkedin,
  MapPin,
  Phone,
  Send,
  Calendar,
  Clock,
  MessageSquare,
  User,
  Globe,
} from 'lucide-angular';
import { ButtonComponent } from '../ui/button/button.component';
import {
  CardComponent,
  CardHeaderComponent,
  CardTitleComponent,
  CardContentComponent,
} from '../ui/card/cards';
import { InputComponent } from '../ui/input/input.component';
import { TextareaComponent } from '../ui/textarea/textarea.component';
import { LabelComponent } from '../ui/label/label.component';

interface ContactInfo {
  icon: any;
  title: string;
  value: string;
  description: string;
  color: string;
  bgColor: string;
  href?: string;
}

interface SocialLink {
  icon: any;
  name: string;
  href: string;
  color: string;
  bgHover: string;
}

@Component({
  selector: 'app-contact-section',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonComponent,
    CardComponent,
    CardHeaderComponent,
    CardTitleComponent,
    CardContentComponent,
    InputComponent,
    TextareaComponent,
    LabelComponent,
    LucideAngularModule,
  ],
  templateUrl: './contact-section.component.html',
  styleUrls: ['./contact-section.component.scss'],
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
    trigger('loadingSpinner', [
      transition(':enter', [
        animate(
          '1s linear',
          keyframes([
            style({ transform: 'rotate(0deg)', offset: 0 }),
            style({ transform: 'rotate(360deg)', offset: 1 }),
          ])
        ),
      ]),
    ]),
  ],
})
export class ContactSectionComponent implements OnInit, OnDestroy {
  @ViewChild('sectionRef', { static: true }) sectionRef!: ElementRef;

  isInView = signal(false);
  isSubmitting = signal(false);
  contactForm: FormGroup;

  // Expose icons for template
  readonly Mail = Mail;
  readonly Github = Github;
  readonly Linkedin = Linkedin;
  readonly MapPin = MapPin;
  readonly Phone = Phone;
  readonly Send = Send;
  readonly Calendar = Calendar;
  readonly Clock = Clock;
  readonly MessageSquare = MessageSquare;
  readonly User = User;
  readonly Globe = Globe;

  contactInfo: ContactInfo[] = [
    {
      icon: Mail,
      title: 'Email',
      value: 'amaan.shaikh@email.com',
      description: 'Drop me a line anytime',
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      href: 'mailto:amaan.shaikh@email.com',
    },
    {
      icon: Phone,
      title: 'Phone',
      value: '+1 (555) 123-4567',
      description: 'Call for urgent matters',
      color: 'text-green-400',
      bgColor: 'bg-green-500/10',
      href: 'tel:+15551234567',
    },
    {
      icon: MapPin,
      title: 'Location',
      value: 'Remote Worldwide',
      description: 'Available across time zones',
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
    },
    {
      icon: Clock,
      title: 'Response Time',
      value: '< 24 hours',
      description: 'Quick turnaround guaranteed',
      color: 'text-orange-400',
      bgColor: 'bg-orange-500/10',
    },
  ];

  socialLinks: SocialLink[] = [
    {
      icon: Linkedin,
      name: 'LinkedIn',
      href: 'https://linkedin.com/in/amaan-shaikh',
      color: 'hover:text-blue-400',
      bgHover: 'hover:bg-blue-500/10',
    },
    {
      icon: Github,
      name: 'GitHub',
      href: 'https://github.com/amaan-shaikh',
      color: 'hover:text-gray-300',
      bgHover: 'hover:bg-gray-500/10',
    },
    {
      icon: Mail,
      name: 'Email',
      href: 'mailto:amaan.shaikh@email.com',
      color: 'hover:text-green-400',
      bgHover: 'hover:bg-green-500/10',
    },
    {
      icon: Globe,
      name: 'Portfolio',
      href: '#',
      color: 'hover:text-cyan-400',
      bgHover: 'hover:bg-cyan-500/10',
    },
  ];

  private intersectionObserver?: IntersectionObserver;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private fb: FormBuilder
  ) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

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

  async onSubmit(): Promise<void> {
    if (this.contactForm.valid && !this.isSubmitting()) {
      this.isSubmitting.set(true);

      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log('Form submitted:', this.contactForm.value);

      this.isSubmitting.set(false);
      this.contactForm.reset();
    }
  }

  openExternalLink(href: string): void {
    if (isPlatformBrowser(this.platformId) && typeof window !== 'undefined') {
      window.open(href, '_blank', 'noopener noreferrer');
    }
  }

  getAnimationState(): string {
    return this.isInView() ? 'visible' : 'hidden';
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.contactForm.get(fieldName);
    return field ? field.invalid && (field.dirty || field.touched) : false;
  }

  getFieldError(fieldName: string): string {
    const field = this.contactForm.get(fieldName);
    if (field?.errors) {
      if (field.errors['required']) return `${fieldName} is required`;
      if (field.errors['email']) return 'Please enter a valid email';
      if (field.errors['minlength']) {
        const min = field.errors['minlength'].requiredLength;
        return `${fieldName} must be at least ${min} characters`;
      }
    }
    return '';
  }

  trackByContactTitle(index: number, contact: ContactInfo): string {
    return contact.title;
  }

  trackBySocialName(index: number, social: SocialLink): string {
    return social.name;
  }
}
