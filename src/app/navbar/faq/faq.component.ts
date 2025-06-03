import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface FaqItem {
  question: string;
  answer: string;
  isActive: boolean;
}

interface FaqSection {
  id: string;
  title: string;
  icon: string;
  items: FaqItem[];
}

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.css'
})
export class FaqComponent {
  // searchTerm: string = '';
  activeCategory: string = 'general';

  categories = [
    { id: 'general', name: 'General' },
    { id: 'estudiantes', name: 'Para Estudiantes' },
    { id: 'tutores', name: 'Para Tutores' },
    { id: 'pagos', name: 'Pagos y Facturación' },
    { id: 'soporte', name: 'Soporte Técnico' }
  ];

  faqSections: FaqSection[] = [
    {
      id: 'general',
      title: 'General de MentorMatch',
      icon: 'fas fa-globe-americas',
      items: [
        {
          question: '¿Qué es MentorMatch?',
          answer: 'MentorMatch es una plataforma que conecta a estudiantes que buscan apoyo académico o desarrollo de habilidades con tutores expertos en diversas materias. Facilitamos un chat uno a uno entre estudiantes y tutores, permitiendo una comunicación fluida y efectiva, además de un sistema de gestión de sesiones que permite a los tutores crear reuniones y a los estudiantes unirse a ellas fácilmente. También ofrecemos un sistema de pago seguro para que los estudiantes puedan pagar por las sesiones de tutoría de manera sencilla y segura.',
          isActive: false
        },
        {
          question: '¿Cómo funciona MentorMatch?',
          answer: 'Es simple: \n1) Regístrate como estudiante o tutor. \n2) Estudiantes: Busca tutores por materia, nivel o tarifas. \n3) Tutores: Completa tu perfil para que los estudiantes te encuentren. \n4) Emparejamiento: Los estudiantes dan "like" a tutores según sus intereses. \n5) Solicitud/Aceptación: Cuando un tutor acepta tu solicitud, se habilita el chat. \n6) Sesiones: Los tutores crean reuniones y los estudiantes se unen a ellas. \n7) Comunícate: Usa el chat para coordinar detalles de la reunión. \n8) Paga/Recibe pagos: Las transacciones se realizan a través de MercadoPago, asegurando un proceso seguro y confiable.',
          isActive: false
        },
        {
          question: '¿Quién puede usar MentorMatch?',
          answer: 'MentorMatch está diseñado para: \n• Estudiantes de cualquier nivel que necesiten ayuda en materias específicas, preparación para exámenes o desarrollo de nuevas habilidades. \n• Profesionales y expertos que deseen compartir sus conocimientos y ganar ingresos como tutores.',
          isActive: false
        },
        {
          question: '¿Es MentorMatch gratuito?',
          answer: 'Registrarse y explorar perfiles de tutores o estudiantes es completamente gratuito. El costo se aplica únicamente a las sesiones de tutoría que los estudiantes toman con un tutor. Las tarifas por sesión son establecidas por cada tutor individualmente.',
          isActive: false
        }
      ]
    },
    {
      id: 'estudiantes',
      title: 'Para Estudiantes',
      icon: 'fas fa-user-graduate',
      items: [
        {
          question: '¿Cómo me registro como estudiante?',
          answer: 'En la página principal, haz clic en "Registrarse" en la esquina superior derecha. Sigue las instrucciones para crear tu cuenta. Una vez completado el registro, recibirás un correo electrónico de confirmación. Después, en la sección "Editar Perfil", podrás seleccionar el rol de estudiante y completar tu información personal, intereses y materias que te gustaría aprender.',
          isActive: false
        },
        {
          question: '¿Cómo busco un tutor?',
          answer: 'Una vez iniciada sesión, ve a la sección "Buscar Tutores" en el menú de navegación. Allí se mostrarán tutores disponibles según los intereses que hayas seleccionado en tu perfil.',
          isActive: false
        },
        {
          question: '¿Cómo elijo al tutor adecuado?',
          answer: 'Te recomendamos revisar cuidadosamente los perfiles de los tutores. Presta atención a su experiencia, las materias que imparten, sus tarifas, la sección "Trayectoria Profesional" te indica su experiencia y la sección "Sobre mí" te da una idea del enfoque y estilo de enseñanza del tutor.',
          isActive: false
        },
        {
          question: '¿Cómo solicito una sesión con un tutor?',
          answer: 'Una vez que se haya generado un match (cuando das "like" a un tutor y él acepta tu solicitud), se habilitará un chat entre el estudiante y el tutor. Desde allí, el tutor podrá programar una reunión y el estudiante podrá unirse a ella ingresando a la sección "Reuniones" de su panel de usuario.',
          isActive: false
        },
        {
          question: '¿Qué sucede después de recibir una solicitud de reunión?',
          answer: 'Una vez que recibes una solicitud de reunión, podrás revisarla en la sección "Reuniones" de tu panel de usuario. Desde allí, puedes aceptar o rechazar la solicitud. Si la aceptas, se te redirigirá a MercadoPago para realizar el pago de la sesión. Una vez confirmado el pago, se confirmará la reunión y se notificará al tutor.',
          isActive: false
        },
        {
          question: '¿Dónde encuentro mis sesiones confirmadas?',
          answer: 'Todas tus reuniones confirmadas se listan en la sección "Reuniones" de tu panel de usuario. Aquí encontrarás la fecha, hora, duración, nombre del tutor y el motivo de la misma.',
          isActive: false
        },
        {
          question: '¿Puedo cambiar o cancelar una reunión?',
          answer: 'Una vez confirmada la reunión (con pago realizado) no podrás cambiarla ni cancelarla directamente. Si necesitas modificar la fecha u hora, contacta directamente a tu tutor a través del chat para discutir posibles alternativas.',
          isActive: false
        },
        {
          question: '¿Cómo puedo contactar a mi tutor antes o después de una sesión confirmada?',
          answer: 'Una vez que una sesión ha sido confirmada, podrás comunicarte con tu tutor a través de la sección de "Chats" de MentorMatch.',
          isActive: false
        }
      ]
    },
    {
      id: 'tutores',
      title: 'Para Tutores',
      icon: 'fas fa-chalkboard-teacher',
      items: [
        {
          question: '¿Cómo me registro como tutor?',
          answer: 'En la página principal, haz clic en "Registrarse" en la esquina superior derecha. Sigue las instrucciones para crear tu cuenta. Una vez completado el registro, recibirás un correo electrónico de confirmación. Después, en la sección "Editar Perfil", podrás seleccionar el rol de tutor y completar tu información personal, experiencia, materias que impartes y tarifas.',
          isActive: false
        },
        {
          question: '¿Cómo consigo estudiantes en MentorMatch?',
          answer: 'Para atraer estudiantes, asegúrate de que tu perfil esté completo y sea atractivo. No es obligatorio, pero recomendamos incluir tu LinkedIn, una descripción clara de tus habilidades y experiencia, y una tarifa competitiva. Los estudiantes podrán encontrarte a través de la búsqueda de tutores.',
          isActive: false
        },
        {
          question: '¿Cómo gestiono las solicitudes de match?',
          answer: 'Las solicitudes de match aparecerán en tu sección "Solicitudes Pendientes". Desde allí, puedes revisar los detalles de la solicitud y decidir si la aceptas o rechazas. Es importante responder a tiempo ya que el estudiante podría estar buscando otros tutores.',
          isActive: false
        },
        {
          question: '¿Cómo me comunico con mis estudiantes?',
          answer: 'Para los matches confirmados, puedes usar la sección de "Chats" en la plataforma para comunicarte con tus estudiantes.',
          isActive: false
        },
        {
          question: '¿Puedo establecer mis propias tarifas por hora?',
          answer: 'Sí, como tutor, tienes la libertad de establecer tu propia tarifa por hora para las sesiones. Puedes ajustar esta tarifa en tu perfil de tutor en cualquier momento.',
          isActive: false
        }
      ]
    },
    {
      id: 'pagos',
      title: 'Pagos y Facturación',
      icon: 'fas fa-credit-card',
      items: [
        {
          question: '¿Qué métodos de pago acepta MentorMatch?',
          answer: 'Aceptamos pagos a través de MercadoPago, que incluye tarjetas de crédito, débito y transferencias bancarias. Esto garantiza una transacción segura y rápida para todos los usuarios.',
          isActive: false
        },
        {
          question: '¿Cuándo se me cobra como estudiante?',
          answer: 'El pago se procesa al momento de confirmar una reunión con un tutor. Una vez que aceptas la reunión, se te redirigirá a MercadoPago para completar el pago antes de que la reunión se confirme.',
          isActive: false
        },
        {
          question: '¿Cómo veo mi historial de pagos como estudiante?',
          answer: 'Puedes acceder a un registro detallado de todos tus pagos y transacciones en la sección "Historial de Pagos" de tu panel.',
          isActive: false
        },
        {
          question: '¿Cuándo y cómo recibo mis pagos como tutor?',
          answer: 'Los pagos se procesan una vez que la sesión ha sido completada y el estudiante ha confirmado su asistencia. Los fondos se transferirán a tu cuenta de MercadoPago. Puedes revisar tu historial de pagos en la sección "Historial de Pagos" de tu panel de tutor.',
          isActive: false
        },
        {
          question: '¿Hay alguna comisión por usar MentorMatch como tutor?',
          answer: 'Sí, MentorMatch cobra una comisión del 10% sobre el monto total de cada sesión pagada. Esta comisión se deduce automáticamente de tus ingresos antes de que se transfieran a tu cuenta de MercadoPago.',
          isActive: false
        },
        {
          question: '¿Mis pagos y datos financieros están seguros en MentorMatch?',
          answer: 'Sí, MentorMatch utiliza MercadoPago para procesar todos los pagos, lo que garantiza que tus datos financieros estén protegidos con los más altos estándares de seguridad. No almacenamos información de pago en nuestra plataforma.',
          isActive: false
        },
        {
          question: '¿Qué pasa si necesito un reembolso?',
          answer: 'Actualmente, MentorMatch no ofrece reembolsos una vez que una sesión ha sido confirmada y pagada. Sin embargo, si tienes un problema con una sesión, te recomendamos que contactes directamente a tu tutor para discutirlo. Estamos trabajando para implementar un sistema de reembolsos en el futuro.',
          isActive: false
        }
      ]
    },
    {
      id: 'soporte',
      title: 'Soporte Técnico y Ayuda',
      icon: 'fas fa-headset',
      items: [
        {
          question: '¿Cómo puedo contactar al soporte técnico de MentorMatch?',
          answer: 'Si necesitas ayuda, puedes enviarnos un correo electrónico a mzeacardenas@gmail.com',
          isActive: false
        },
        {
          question: '¿Qué debo hacer si no puedo iniciar sesión?',
          answer: 'Primero, verifica que tu correo electrónico y contraseña sean correctos. Si los olvidaste, utiliza la opción "¿Olvidaste tu contraseña?" para restablecerla. Si el problema persiste, intenta limpiar la caché y las cookies de tu navegador o contacta a soporte.',
          isActive: false
        }
      ]
    }
  ];

  setActiveCategory(categoryId: string): void {
    this.activeCategory = categoryId;
  }

  toggleFaqItem(sectionId: string, itemIndex: number): void {
    const section = this.faqSections.find(s => s.id === sectionId);
    if (section && section.items[itemIndex]) {
      section.items[itemIndex].isActive = !section.items[itemIndex].isActive;
    }
  }

  getActiveSection(): FaqSection | undefined {
    return this.faqSections.find(section => section.id === this.activeCategory);
  }

  // getFilteredItems(items: FaqItem[]): FaqItem[] {
  //   if (!this.searchTerm.trim()) {
  //     return items;
  //   }

  //   const searchLower = this.searchTerm.toLowerCase();
  //   return items.filter(item =>
  //     item.question.toLowerCase().includes(searchLower) ||
  //     item.answer.toLowerCase().includes(searchLower)
  //   );
  // }

  shouldShowItem(item: FaqItem): boolean {
    // if (!this.searchTerm.trim()) {
    //   return true;
    // }

    // const searchLower = this.searchTerm.toLowerCase();
    // const matches = item.question.toLowerCase().includes(searchLower) ||
    //   item.answer.toLowerCase().includes(searchLower);

    // // Auto-expand items that match search
    // if (matches && !item.isActive) {
    //   item.isActive = true;
    // }

    // return matches;
    return true;
  }
}