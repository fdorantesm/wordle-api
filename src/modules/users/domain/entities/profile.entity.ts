export class ProfileEntity {
  constructor(public name: string, public phone: string) {}

  static create(profile: UserProfile) {
    return new ProfileEntity(profile.name, profile.phone);
  }
}

export type UserProfile = {
  name: string;
  phone: string;
};
