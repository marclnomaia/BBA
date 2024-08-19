import { Link } from 'expo-router';
import { openBrowserAsync } from 'expo-web-browser';
import { ComponentProps } from 'react';
import { Platform } from 'react-native';

type HrefType = string | { pathname: string; query?: Record<string, any> };
type Props = Omit<ComponentProps<typeof Link>, 'href'> & { href: HrefType };

export function ExternalLink({ href, ...rest }: Props) {
  const handlePress = async (event: any) => {
    if (Platform.OS !== 'web') {
      event.preventDefault();
      const url = typeof href === 'string' ? href : href.pathname;
      await openBrowserAsync(url);
    }
  };

  return (
    <ExternalLink href={{ pathname: '/search', query: { q: 'React Native' } }} />

  );
}


