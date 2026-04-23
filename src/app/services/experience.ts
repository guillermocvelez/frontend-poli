import { Injectable } from '@angular/core';

export interface Experience {
  id: string;
  title: string;
  description: string;
  price: string;
  image: string;
  category: string;
  duration: string;
  location: string;
  badge?: string;
  icon?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {
  private experiences: Experience[] = [
    {
      id: '1',
      title: 'Tour de Cosecha Privado',
      description: 'Vive el proceso del grano a la taza en las montañas más icónicas del Quindío.',
      price: 'Desde $120',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDGwrbqTswOobELPz2GgkM3V-l_qQj8zVDN6P8QlUnp-SP_Shxj6EXp6Lg9Hktefkn_9GNdRv91U6xTHpQQ2i3d8mYIeecUosZsPYqmMhJNdCY_JNg4c3mkbaVnaPGMFoQKSNrGKTqVZ-mH1gChcAGzqgpGFqQ0_Vvk3qWXulusPBHNt0iN8C0yjgMP_Wd2Pf3HseYxa30DLDOYrg4Vzp-CmrK3tkYlIPhHszH1F1zQiVF8YgfSSVH_KyftK6uKBMhDijdJMSqT6Wny',
      category: 'cultura',
      duration: 'Medio Día',
      location: 'Cafetal San Alberto',
      icon: 'coffee'
    },
    {
      id: '2',
      title: 'Estadía Colonial Salento',
      description: 'Arquitectura preservada y confort moderno en el corazón del Eje Cafetero.',
      price: 'Desde $150',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA1mcAH9Mc8bB-GUfYgVvOqfw2_SN9BdsvL8UXhzYTr-6KP7B_5S9DORwHKSV6vNkhNsR-srSJQgLkWrBOYMtuev8eK9UNjnPNbccrqf1RLSkmOSh1qRdPtQ1SiLnSREWQc-okCMH3VEZBXLXjm5pdOMa-_u7T_UzIns8-vAKxNJv0tC1PWFtK_bO8GoftWPrRFKnN4XIXr1Q8Yzpegn5JMurmfC2f8spqmw2MieV2yWZm4Pydkz2FP4pFa2WARYU6PsHovlfGTHFJM',
      category: 'relax',
      duration: 'Noche',
      location: 'Salento, Quindío',
      icon: 'house'
    },
    {
      id: '3',
      title: 'Trekking Valle de Cocora',
      description: 'Camina entre las palmas de cera más altas del mundo. Una ruta escénica por el bosque de niebla.',
      price: '$120 USD',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD273o8XZpFhZEKaKcyvl817hU81T5KHtCHtjHeLlAlkHQJb31CCE98izWi6B4ORVncrPDKWOwONCEi1KFUO0iolyYcBmMTig36BNQkMZCPi6DM6aTGASVphLclOnbYJj80i9OlK69TDeZWP0uGd0sAwjcQUrKId4TBzqoeQTjJ4Fp4aW3YamQTXY-nb-N_tj4pBsnkLenM1ldS12SxkKJn1gX19dnXLkHb8nDJJNxMEWhpK_I6z9U6OdQC1M7_201CSGVL0jsiSX2Y',
      category: 'senderismo',
      duration: 'Día Completo',
      location: 'Valle de Cocora',
      badge: 'DESTACADO'
    },
    {
      id: '4',
      title: 'Termales Santa Rosa',
      description: 'Relájate en aguas termales naturales bajo una majestuosa caída de agua de 95 metros.',
      price: '$90 USD',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCj8EawRl6Yzmhkn45Oo3-5ui-nZ-WvJHXb8fiqKL3hItOFAPSGhqjtYkGt5ylfdF4MnQ8UNDkADoVk8YueQitAjlypu9L4e5i3K2zqgX1aMFqJ1Z_tnWorR5KWLY49kiYV4PFNZUsLg4W5tSNtN79Yc2QJkXPfCGJ9A2z0Qz_PW4UcleMQicHv541486oJm1e24DNDEdf_elyChelnUMGhphUnW_3siW_Pd4pMIvlaZWMmnW5zm6jBiHgRR44KOVpdPlyQnhb7LdWD',
      category: 'relax',
      duration: 'Medio Día',
      location: 'Santa Rosa de Cabal',
      badge: 'RELAX'
    }
  ];

  constructor() { }

  getExperiences() {
    return this.experiences;
  }

  getExperienceById(id: string) {
    return this.experiences.find(e => e.id === id);
  }
}
