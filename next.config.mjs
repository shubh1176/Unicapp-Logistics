/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
      return [
        {
          source: '/dashboard/admin-panel',
          destination: '/dashboard',
          permanent: false,
          has: [
            {
              type: 'header',
              key: 'x-is-admin',
              value: 'false',
            },
          ],
        },
      ];
    },
  };
  
  export default nextConfig;
  