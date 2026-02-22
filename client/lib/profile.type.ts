import { z } from "zod";

const ImageVersionsSchema = z.object({
  large: z.string().url(),
  medium: z.string().url(),
  small: z.string().url(),
  micro: z.string().url(),
});

const ImageSchema = z.object({
  link: z.string().url(),
  versions: ImageVersionsSchema,
});

const UserRefSchema = z.object({
  id: z.number(),
  login: z.string(),
  url: z.string().url(),
});

const CursusSchema = z.object({
  id: z.number(),
  created_at: z.string(),
  name: z.string(),
  slug: z.string(),
  kind: z.string(),
});

const SkillSchema = z.object({
  id: z.number(),
  name: z.string(),
  level: z.number(),
});

const CursusUserSchema = z.object({
  id: z.number(),
  begin_at: z.string(),
  end_at: z.string().nullable(),
  grade: z.string().nullable(),
  level: z.number(),
  skills: z.array(SkillSchema),
  cursus_id: z.number(),
  has_coalition: z.boolean(),
  blackholed_at: z.string().nullable(),
  created_at: z.string(),
  updated_at: z.string(),
  user: UserRefSchema,
  cursus: CursusSchema,
});

const LanguageSchema = z.object({
  id: z.number(),
  name: z.string(),
  identifier: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

const CampusSchema = z.object({
  id: z.number(),
  name: z.string(),
  time_zone: z.string(),
  language: LanguageSchema,
  users_count: z.number(),
  vogsphere_id: z.number(),
  country: z.string().optional(),
  address: z.string().optional(),
  zip: z.string().optional(),
  city: z.string().optional(),
  website: z.string().optional(),
  facebook: z.string().optional(),
  twitter: z.string().optional(),
  active: z.boolean().optional(),
  public: z.boolean().optional(),
  email_extension: z.string().optional(),
  default_hidden_phone: z.boolean().optional(),
});

const CampusUserSchema = z.object({
  id: z.number(),
  user_id: z.number(),
  campus_id: z.number(),
  is_primary: z.boolean(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
});

const LanguageUserSchema = z.object({
  id: z.number(),
  language_id: z.number(),
  user_id: z.number(),
  position: z.number(),
  created_at: z.string(),
});

const PatronedSchema = z.object({
  id: z.number(),
  user_id: z.number(),
  godfather_id: z.number(),
  ongoing: z.boolean(),
  created_at: z.string(),
  updated_at: z.string(),
});

const ExpertiseUserSchema = z.object({
  id: z.number(),
  expertise_id: z.number(),
  interested: z.boolean(),
  value: z.number(),
  contact_me: z.boolean(),
  created_at: z.string(),
  user_id: z.number(),
});

const ProjectRefSchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string(),
  parent_id: z.number().nullable(),
});

const ProjectUserSchema = z.object({
  id: z.number(),
  occurrence: z.number(),
  final_mark: z.number().nullable(),
  status: z.string(),
  "validated?": z.boolean().nullable(),
  current_team_id: z.number(),
  project: ProjectRefSchema,
  cursus_ids: z.array(z.number()),
  marked_at: z.string().nullable(),
  marked: z.boolean(),
  retriable_at: z.string().nullable(),
  created_at: z.string(),
  updated_at: z.string(),
});

const AchievementSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  tier: z.string(),
  kind: z.string(),
  visible: z.boolean(),
  image: z.string(),
  nbr_of_success: z.number().nullable(),
  users_url: z.string().url(),
});

const TitleSchema = z.object({
  id: z.number(),
  name: z.string(),
});

const TitleUserSchema = z.object({
  id: z.number(),
  user_id: z.number(),
  title_id: z.number(),
  selected: z.boolean(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const ProfileSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  login: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  usual_full_name: z.string(),
  usual_first_name: z.string().nullable(),
  url: z.string().url(),
  phone: z.string().nullable(),
  displayname: z.string(),
  kind: z.string(),
  image: ImageSchema,
  "staff?": z.boolean(),
  correction_point: z.number(),
  pool_month: z.string(),
  pool_year: z.string(),
  location: z.string().nullable(),
  wallet: z.number(),
  anonymize_date: z.string().nullable(),
  data_erasure_date: z.string().nullable(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
  alumnized_at: z.string().nullable().optional(),
  "alumni?": z.boolean(),
  "active?": z.boolean(),
  groups: z.array(z.unknown()),
  cursus_users: z.array(CursusUserSchema),
  projects_users: z.array(ProjectUserSchema),
  languages_users: z.array(LanguageUserSchema),
  achievements: z.array(AchievementSchema),
  titles: z.array(TitleSchema),
  titles_users: z.array(TitleUserSchema),
  partnerships: z.array(z.unknown()),
  patroned: z.array(PatronedSchema),
  patroning: z.array(z.unknown()),
  expertises_users: z.array(ExpertiseUserSchema),
  roles: z.array(z.unknown()),
  campus: z.array(CampusSchema),
  campus_users: z.array(CampusUserSchema),
});

export const ProfileArraySchema = z.array(ProfileSchema);

export type TProfile = z.infer<typeof ProfileSchema>;
