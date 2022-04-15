import { Button, Text, Image } from '@chakra-ui/react';
import type { NextPage } from 'next';
import { signIn, signOut, useSession } from 'next-auth/react';

const Profile: NextPage = () => {
  const { data: session } = useSession();
  if (session) {
    return (
      <div>
        <Text>Profile!?!?</Text>
        {session.user ? (
          <Image alt='profile picture' src={session.user.image} />
        ) : null}

        <Button onClick={() => signOut()}>Sign Out</Button>
      </div>
    );
  }
  return (
    <div>
      <Text>Profile!?!?</Text>
      <Button onClick={() => signIn()}>Sign In</Button>
    </div>
  );
};

export default Profile;

