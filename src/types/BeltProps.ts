import * as shared from "../shared/shared";

export type StripeStart = "Left" | "Right";
export type BeltType =
  | "Solid"
  | "Striped"
  | "Coral"
  | "Split"
  | "Checkered"
  | "Crazy";

export interface BeltProps {
  border: string;
  hasPatch: boolean;
  patch: string;
  patchBorder: string;
  professorPatch: string;
  professorBorder: string;
  hasProfessorPatch: boolean;
  stripeCount: number;
  stripeStart: StripeStart;
  stripe1: string;
  stripe2: string;
  stripe3: string;
  stripe4: string;
  stripe5: string;
  stripe6: string;
  stripe7: string;
  stripe8: string;
  stripe9: string;
  stripe10: string;
  s1l1: string;
  s1l2a: string;
  s1l2b: string;
  s1l3: string;
  s2l1: string;
  s2l2a: string;
  s2l2b: string;
  s2l3: string;
  s3l1: string;
  s3l2a: string;
  s3l2b: string;
  s3l3: string;
  s4l1: string;
  s4l2a: string;
  s4l2b: string;
  s4l3: string;
  s5l1: string;
  s5l2a: string;
  s5l2b: string;
  s5l3: string;
  s6l1: string;
  s6l2a: string;
  s6l2b: string;
  s6l3: string;
  s7l1: string;
  s7l2a: string;
  s7l2b: string;
  s7l3: string;
  s8l1: string;
  s8l2a: string;
  s8l2b: string;
  s8l3: string;
  s9l1: string;
  s9l2a: string;
  s9l2b: string;
  s9l3: string;
  s10l1: string;
  s10l2a: string;
  s10l2b: string;
  s10l3: string;
  s11l1: string;
  s11l2a: string;
  s11l2b: string;
  s11l3: string;
  s12l1: string;
  s12l2a: string;
  s12l2b: string;
  s12l3: string;
  s13l1: string;
  s13l2a: string;
  s13l2b: string;
  s13l3: string;
  transitionCSS: string;
  rdfTitle: string;
  rdfDescription: string;
  randomBeltTypes: BeltType[];
  refreshInterval: number;
}

export interface BeltColor {
  name: string;
  hex: string;
}

export interface Belt {
  name: string;
  type: BeltType;
  sortOrder: number;
  color1: string;
  color2: string;
  color3: string;
  borderColor: string;
  hasPatch: boolean;
  patchColor: string;
  patchBorderColor: string;
  hasProfessorPatch: boolean;
  professorPatchColor: string;
  professorBorderColor: string;
  stripeColor: string;
  stripeCount: number;
}

export class BeltSystem {
  name: string;
  title: string;
  transitionCSS: string;
  refreshInterval: number;
  colors: BeltColor[];
  belts: Belt[];

  constructor(system: any) {
    this.name = system.name;
    this.title = system.title;
    this.transitionCSS = system.transitionCSS;
    this.refreshInterval = system.refreshInterval;
    this.colors = system.colors;
    this.belts = system.belts;

    shared.mapColors(this.belts, this.colors);
  }

  getBeltProps(belt: Belt, stripeCount: number): BeltProps {
    const rdfTitle = `${this.title} ${belt.name} Belt`;
    const rdfDescription = shared.getDescription(rdfTitle, belt.stripeCount);

    return shared.setBeltProps(
      belt,
      stripeCount,
      rdfTitle,
      rdfDescription,
      this.transitionCSS,
      this.refreshInterval
    );
  }

  getBeltPropsByName(name: string, stripeCount: number): BeltProps[] {
    const beltPropsAry: BeltProps[] = [];
    const belt: Belt | undefined = this.belts.find(
      (belt) => belt.name === name
    );
    if (belt) beltPropsAry.push(this.getBeltProps(belt, stripeCount));

    return beltPropsAry;
  }

  getBeltPropsAll(transitionCSS: string, refreshInterval: number): BeltProps[] {
    const beltPropsAry: BeltProps[] = [];
    this.belts.forEach((belt) => {
      const beltProps = this.getBeltProps(belt, belt.stripeCount);
      beltProps.transitionCSS = transitionCSS;
      beltProps.refreshInterval = refreshInterval;
      beltPropsAry.push(beltProps);
    });

    return beltPropsAry;
  }
}
