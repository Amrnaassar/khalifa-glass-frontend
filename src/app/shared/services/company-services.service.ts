import { Injectable } from '@angular/core';

export interface ICompanyService {
  id: number
  name: string
  icon: string
}

@Injectable({
  providedIn: 'root'
})
export class CompanyServicesService {

  services: ICompanyService[] = [
    {
      id: 1,
      name: 'services.items.glassService1',
      icon: 'assets/images/service_imgs/Glass Installation.webp'
    },
    {
      id: 2,
      name: 'services.items.glassService2',
      icon: 'assets/images/service_imgs/Glass Maintenance.webp'
    }, {
      id: 3,
      name: 'services.items.glassService3',
      icon: 'assets/images/service_imgs/Glass Partitions.webp'

    }, {
      id: 4,
      name: 'services.items.glassService4',
      icon: 'assets/images/service_imgs/Office Glass.webp'

    }, {
      id: 5,
      name: 'services.items.glassService5',
      icon: 'assets/images/service_imgs/Mirror Installation.webp'

    }, {
      id: 6,
      name: 'services.items.glassService6',
      icon: 'assets/images/service_imgs/Shower Glass.webp'

    }, {
      id: 7,
      name: 'services.items.glassService7',
      icon: 'assets/images/service_imgs/Glass Doors.webp'

    },
    {
      id: 8,
      name: 'services.items.glassService8',
      icon: 'assets/images/service_imgs/Emergency Repair.webp'

    },

  ];
  constructor() { }
  getAllServices() {
    return this.services;
  }
}
