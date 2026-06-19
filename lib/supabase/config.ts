const SUPABASE_URL_KEY = "NEXT_PUBLIC_SUPABASE_URL";
const SUPABASE_PUBLISHABLE_KEY = "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY";

export type SupabasePublicConfig = {
  url: string;
  publishableKey: string;
};

export type SupabasePublicConfigStatus = {
  isConfigured: boolean;
  urlPresent: boolean;
  urlValid: boolean;
  publishableKeyPresent: boolean;
  urlHost: string | null;
  missingKeys: string[];
};

function readEnvValue(env: NodeJS.ProcessEnv, key: string) {
  return env[key]?.trim() ?? "";
}

function getUrlHost(value: string) {
  if (!value) {
    return null;
  }

  try {
    return new URL(value).host;
  } catch {
    return null;
  }
}

export function getSupabasePublicConfigStatus(
  env: NodeJS.ProcessEnv = process.env,
): SupabasePublicConfigStatus {
  const url = readEnvValue(env, SUPABASE_URL_KEY);
  const publishableKey = readEnvValue(env, SUPABASE_PUBLISHABLE_KEY);
  const urlHost = getUrlHost(url);
  const missingKeys = [
    url ? null : SUPABASE_URL_KEY,
    publishableKey ? null : SUPABASE_PUBLISHABLE_KEY,
  ].filter((key): key is string => Boolean(key));

  return {
    isConfigured: missingKeys.length === 0 && Boolean(urlHost),
    urlPresent: Boolean(url),
    urlValid: Boolean(urlHost),
    publishableKeyPresent: Boolean(publishableKey),
    urlHost,
    missingKeys,
  };
}

export function getSupabasePublicConfig(
  env: NodeJS.ProcessEnv = process.env,
): SupabasePublicConfig | null {
  const status = getSupabasePublicConfigStatus(env);

  if (!status.isConfigured) {
    return null;
  }

  return {
    url: readEnvValue(env, SUPABASE_URL_KEY),
    publishableKey: readEnvValue(env, SUPABASE_PUBLISHABLE_KEY),
  };
}
