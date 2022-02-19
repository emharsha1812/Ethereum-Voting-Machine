import React from 'react'
import logo from '../public/logo.png'
import Image from 'next/image'
import { MdDomainVerification } from 'react-icons/md'
import { BsFillPersonPlusFill } from 'react-icons/bs'
import { GiVote } from 'react-icons/gi'
import { GiArchiveRegister } from 'react-icons/gi'
import { GrThreeDEffects } from 'react-icons/gr'
import { IconContext } from 'react-icons'
import { TiTick } from 'react-icons/ti'
import Link from 'next/link'

const Navbar = () => {
  return (
    <div className="navbar mb-2 bg-neutral text-2xl text-neutral-content shadow-lg">
      <div className="m-4">
        <Image
          src={logo}
          alt="Picture of the author"
          width={100}
          height={100}
          // blurDataURL="data:..." automatically provided
          // placeholder="blur" // Optional blur-up while loading
        />
      </div>
      <div class="navbar-start mx-2 px-2">
        <Link href="/">
          <span class="text-xl font-bold text-teal-500 hover:cursor-pointer">
            Blockchain Election
          </span>
        </Link>
      </div>

      <div class="navbar-center mx-2 hidden  px-4 lg:flex">
        <div class="justify-space flex items-stretch justify-evenly">
          <Link href="/verification">
            <a class="btn btn-ghost rounded-btn btn-sm text-lg">
              <MdDomainVerification /> Verification
            </a>
          </Link>
          <Link href="/addcandidate">
            <a class="btn btn-ghost rounded-btn btn-sm text-lg">
              <BsFillPersonPlusFill /> Add Candidate
            </a>
          </Link>
          <Link href="/registration">
            <a class="btn btn-ghost rounded-btn btn-sm text-lg">
              <GiArchiveRegister /> Registration
            </a>
          </Link>
          {/* <Link href="/vote">
            <a class="btn btn-ghost rounded-btn btn-sm text-lg">
              <GiVote />
              Vote
            </a>
          </Link> */}
          <Link href="/results">
            <a class="btn btn-ghost rounded-btn btn-sm text-lg text-white">
              <TiTick className="text-white" />
              Results
            </a>
          </Link>
        </div>
      </div>
      <div class="navbar-end"></div>
    </div>
  )
}

export default Navbar
