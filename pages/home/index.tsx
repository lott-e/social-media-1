import type { NextPage, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "./Home.module.css";
import { userInfo } from "os";
import * as React from "react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Container, Card, Button, Grid } from "@nextui-org/react";
import { PrismaClient } from "@prisma/client";
import UserCard from "../components/UserCard";

const Home: NextPage = ({
  users,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      <div className={styles.container}>
        <Head>
          <title>Home for</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <h1 className={styles.title}> Home </h1>
          <ul>
            {users.map((user) => (
              <li className={styles.title} key={user.username}>
                {user.username} {user.userToken}
              </li>
            ))}
          </ul>

          <Link href="profile">
            <Button>Profile</Button>
          </Link>
          <Card className={styles.header}>
            <Button onClick={signOut}>Sign Out</Button>
          </Card>
        </main>
      </div>
    </>
  );
};

export async function getServerSideProps() {
  const prisma = new PrismaClient();

  const users = await prisma.users.findMany();
  // const users = await res.json()


  return {
    props: {
      users: users.map(
        (user: user) =>
        ({
          ...user,
          username: user.username.toString(),
          name: user.name.toString(),
          email: user.email.toString(),
          registeredAt: user.registeredAt.toISOString(),
        } as unknown as user)
      ),
    },
  };
}

export default Home;
