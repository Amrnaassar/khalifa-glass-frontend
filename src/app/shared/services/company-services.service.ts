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
      icon: 'assets/images/service_imgs/Glass Installation.png'
    },
    {
      id: 2,
      name: 'services.items.glassService2',
      icon: 'assets/images/service_imgs/Glass Maintenance.png'
    }, {
      id: 3,
      name: 'services.items.glassService3',
      icon: 'assets/images/service_imgs/Glass Partitions.png'

    }, {
      id: 4,
      name: 'services.items.glassService4',
      icon: 'assets/images/service_imgs/Office Glass.png'

    }, {
      id: 5,
      name: 'services.items.glassService5',
      icon: 'assets/images/service_imgs/Mirror Installation.png'

    }, {
      id: 6,
      name: 'services.items.glassService6',
      icon: 'assets/images/service_imgs/Shower Glass.png'

    }, {
      id: 7,
      name: 'services.items.glassService7',
      icon: 'assets/images/service_imgs/Glass Doors.png'

    },
    {
      id: 8,
      name: 'services.items.glassService8',
      icon: 'assets/images/service_imgs/Emergency Repair.png'

    },

  ];
  constructor() { }
  getAllServices() {
    return this.services;
  }
}
