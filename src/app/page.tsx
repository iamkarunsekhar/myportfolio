"use client"

import React, { useState, useEffect } from 'react';
import { CodeBracketIcon, CameraIcon, EnvelopeIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { SiGithub, SiInstagram } from "@icons-pack/react-simple-icons";
import { Linkedin } from "lucide-react";
import Image from 'next/image';
import Card from '@/components/Card';
import SpotifyTopTrack from '@/components/SpotifyTopTrack';
import Link from 'next/link';
import InstagramEmbed from '@/components/InstagramEmbed';
import StyledClock from '@/components/WallClock/WallClock';

export default function HomePage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const skills = ["React", "Next.js", "TypeScript", "JavaScript", "TailwindCSS", "Figma", "AWS", "Azure", "Python", "FastAPI", "OpenAI SDK", "SQL", "PyTesseract", "PyTorch", "NoSQL"];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/Karun_Sekhar_Resume.pdf';
    link.download = 'Karun_Sekhar_Resume.pdf';
    link.click();
  };

  return (
    <div className="min-h-screen text-white font-mono relative overflow-hidden">
      <div className="relative z-10 min-h-screen p-6 max-w-7xl mx-auto">
        {/* Mosaic Grid Layout */}
        <div className="grid grid-cols-12 grid-rows-12 gap-4">

          {/* Main Introduction Card - Large Left Side */}
          <Card layout='col-span-7 row-span-6'>
            <div className="h-full flex flex-col justify-center">
              <h1 className="text-md text-gray-400 mb-4">Hey! How's it going?</h1>
              <div className="space-y-4 text-lg leading-relaxed">
                <p>
                  My name is <span className="text-white">Karun Sekhar</span>, and I am a{' '}
                  <span className="text-[#F68080] font-semibold">senior software engineer</span> with a goal to{' '}
                  <span className="text-[#F9B16E]">develop</span>, <span className="text-[#F9B16E]">design</span>, and{' '}
                  <span className="text-[#F9B16E]">distribute</span> beautiful experiences for all!
                </p>
                <p className="text-gray-300">
                  On top of that, I also like to spend time as a musician and photographer.
                </p>
                <p className="text-[#F68080] text-lg font-sans font-medium italic mt-8">
                  Let's create something together.
                </p>
              </div>
            </div>
          </Card>

          {/* Portrait photo */}
          <Card layout='col-span-5 row-span-4'>
            <div className="h-full flex items-center justify-center">
              <Image 
                src={"/portrait_bw.jpg"} 
                alt='A photo of me holding a camera!' 
                fill
                className="object-cover rounded-xl"
              />
            </div>
          </Card>

          {/* Social Links Card - Right Side */}
          <Card layout='col-span-1 row-span-2'>
            <div className="flex flex-col justify-center items-center gap-6 h-full">
              <Link 
                href="https://www.github.com/iamkarunsekhar" 
                target='__blank' 
                className="flex items-center text-white hover:text-gray-300 transition-colors duration-300 text-sm group-hover:text-[#F68080] cursor-pointer">
                <SiGithub size={24} />
              </Link>
              <Link 
                href="https://www.instagram.com/karun.sekhar" 
                target='__blank' 
                className="flex items-center text-white hover:text-gray-300 transition-colors duration-300 text-sm group-hover:text-[#F68080] cursor-pointer">
                <SiInstagram size={24} />
              </Link>
              <Link 
                href="https://www.linkedin.com/in/karun-sekhar" 
                target='__blank' 
                className="flex items-center text-white hover:text-gray-300 transition-colors duration-300 text-sm group-hover:text-[#F68080] cursor-pointer">
                <Linkedin />
              </Link>
            </div>
          </Card>

          {/* Modern Clock */}
          <Card layout='col-span-4 row-span-2'>
            <div className='w-full h-full'>
              <StyledClock size={200} className='mx-auto'/>
            </div>
          </Card>

          {/* Software Engineering Card */}
          <Card layout='col-span-4 row-span-4'>
            <CodeBracketIcon className="w-10 h-10 text-white mb-4 group-hover:text-[#F68080] transition-colors duration-300" />
            <h3 className="text-xl font-sans font-bold mb-3">Senior Software Engineer</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Full-stack developer specializing in Next.js, TypeScript, and Python. Building scalable applications with modern technologies.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span key={skill} className="px-2 py-1 bg-white/10 rounded text-xs">{skill}</span>
              ))}
            </div>
            <button onClick={handleDownload} className="flex items-center mt-3 text-white hover:text-gray-300 transition-colors duration-300 text-sm group-hover:text-[#F68080] cursor-pointer">
              Get My Resume <ArrowRightIcon className="w-4 h-4 ml-2" />
            </button>
          </Card>

          {/* Photography Card */}
          <Card layout='col-span-4 row-span-4'>
            <CameraIcon className="w-10 h-10 text-white mb-4 group-hover:text-[#F68080] transition-colors duration-300" />
            <h3 className="text-xl font-sans font-bold mb-3">Photography</h3>
            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              Capturing moments through my lens. Landscapes, portraits, and street photography.
            </p>
            <button className="flex items-center text-white hover:text-gray-300 transition-colors duration-300 text-sm group-hover:text-[#F68080] cursor-pointer">
              View Gallery <ArrowRightIcon className="w-4 h-4 ml-2" />
            </button>
          </Card>

          {/* MusicalNoteIcon Card */}
          <Card layout='col-span-4 row-span-4'>
            <div className='w-full h-full flex font-sans italic justify-center items-center text-[#F68080] font-semibold text-2xl'>
              <InstagramEmbed url='https://www.instagram.com/p/DMbUP9aS7TP/?utm_source=ig_embed&amp;utm_campaign=loading'/>
            </div>
          </Card>

          {/* Featured Project Card - Wide */}
          <Card layout='col-span-8 row-span-2'>
            <SpotifyTopTrack timeRange="medium_term" />
          </Card>

          {/* Contact CTA Card */}
          <Card layout='col-span-4 row-span-2'>
            <div className="h-full flex flex-col justify-center items-center text-center">
              <EnvelopeIcon className="w-8 h-8 text-white mb-3 group-hover:text-[#F68080] transition-colors duration-300" />
              <h3 className="text-lg font-bold mb-2">Let's Connect</h3>
              <button className="px-4 py-2 bg-white text-black rounded-full hover:bg-gray-200 transition-all duration-300 text-sm font-medium group-hover:bg-[#F68080] cursor-pointer">
                Get In Touch
              </button>
            </div>
          </Card>

          {/* Spotify */}
          {/* Your current top track */}
        </div>
      </div>

      {/* Cursor follower effect */}
      <div 
        className="fixed w-3 h-3 bg-white/30 rounded-full pointer-events-none z-50 transition-transform duration-100"
        style={{
          left: mousePosition.x - 6,
          top: mousePosition.y - 6,
        }}
      />
    </div>
  );
}
