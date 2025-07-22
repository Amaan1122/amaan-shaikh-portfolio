import {
  Component,
  ChangeDetectionStrategy,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { LucideAngularModule, Github, Linkedin, Mail } from 'lucide-angular';

interface SocialLink {
  icon: any;
  href: string;
  color: string;
}

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  // Expose icons for template
  readonly Github = Github;
  readonly Linkedin = Linkedin;
  readonly Mail = Mail;

  socialLinks: SocialLink[] = [
    {
      icon: Linkedin,
      href: 'https://linkedin.com/in/amaan-shaikh',
      color: 'hover:text-primary',
    },
    {
      icon: Github,
      href: 'https://github.com/amaan-shaikh',
      color: 'hover:text-primary',
    },
    {
      icon: Mail,
      href: 'mailto:amaan.shaikh@email.com',
      color: 'hover:text-primary',
    },
  ];

  currentYear: number;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.currentYear = new Date().getFullYear();
  }

  openExternalLink(href: string): void {
    if (isPlatformBrowser(this.platformId) && typeof window !== 'undefined') {
      window.open(href, '_blank', 'noopener noreferrer');
    }
  }

  trackBySocialHref(index: number, social: SocialLink): string {
    return social.href;
  }
}
