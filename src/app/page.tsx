"use client"

import React, { useState, useEffect } from 'react';
import { CodeBracketIcon, CameraIcon, EnvelopeIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { SiGithub, SiInstagram } from "@icons-pack/react-simple-icons";
import { Linkedin } from "lucide-react";
import Image from 'next/image';
import Card from '@/components/Card';
import SpotifyTopTrack from '@/components/SpotifyTopTrack';

export default function HomePage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const skills = ["React", "Next.js", "TypeScript", "JavaScript", "AWS", "Azure", "Python", "FastAPI", "OpenAI SDK", "SQL", "NoSQL"];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Subtle animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute w-96 h-96 bg-white/5 rounded-full blur-3xl transition-transform duration-1000 ease-out"
          style={{
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
            left: '20%',
            top: '10%'
          }}
        />
        <div 
          className="absolute w-80 h-80 bg-white/3 rounded-full blur-3xl transition-transform duration-1000 ease-out"
          style={{
            transform: `translate(${mousePosition.x * -0.015}px, ${mousePosition.y * -0.015}px)`,
            right: '20%',
            bottom: '10%'
          }}
        />
      </div>

      <div className="relative z-10 min-h-screen p-6 max-w-7xl mx-auto">
        {/* Mosaic Grid Layout */}
        <div className="grid grid-cols-12 grid-rows-12 gap-4">

          {/* Main Introduction Card - Large Left Side */}
          <Card layout='col-span-7 row-span-6'>
            <div className="h-full flex flex-col justify-center">
              <h1 className="text-sm text-gray-400 mb-4">Hey! How's it going?</h1>
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
                <p className="text-[#F68080] font-medium italic mt-8">
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
          <Card layout='col-span-5 row-span-2'>
            <div className="flex justify-center items-center space-x-6 h-full">
              <button className="flex items-center text-white hover:text-gray-300 transition-colors duration-300 text-sm group-hover:text-[#F68080] cursor-pointer">
                <SiGithub size={24} />
              </button>
              <button className="flex items-center text-white hover:text-gray-300 transition-colors duration-300 text-sm group-hover:text-[#F68080] cursor-pointer">
                <SiInstagram size={24} />
              </button>
              <button className="flex items-center text-white hover:text-gray-300 transition-colors duration-300 text-sm group-hover:text-[#F68080] cursor-pointer">
                <Linkedin />
              </button>
            </div>
          </Card>

          {/* Software Engineering Card */}
          <Card layout='col-span-4 row-span-3'>
            <CodeBracketIcon className="w-10 h-10 text-white mb-4 group-hover:text-[#F68080] transition-colors duration-300" />
            <h3 className="text-xl font-bold mb-3">Software Engineer</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Full-stack developer specializing in Next.js, TypeScript, and Python. Building scalable applications with modern technologies.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span key={skill} className="px-2 py-1 bg-white/10 rounded text-xs">{skill}</span>
              ))}
            </div>
            <button className="flex items-center mt-3 text-white hover:text-gray-300 transition-colors duration-300 text-sm group-hover:text-[#F68080] cursor-pointer">
              Get My Resume <ArrowRightIcon className="w-4 h-4 ml-2" />
            </button>
          </Card>

          {/* Photography Card */}
          <Card layout='col-span-4 row-span-3'>
            <CameraIcon className="w-10 h-10 text-white mb-4 group-hover:text-[#F68080] transition-colors duration-300" />
            <h3 className="text-xl font-bold mb-3">Photography</h3>
            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              Capturing moments through my lens. Landscapes, portraits, and street photography.
            </p>
            <button className="flex items-center text-white hover:text-gray-300 transition-colors duration-300 text-sm group-hover:text-[#F68080] cursor-pointer">
              View Gallery <ArrowRightIcon className="w-4 h-4 ml-2" />
            </button>
          </Card>

          {/* MusicalNoteIcon Card */}
          <Card layout='col-span-4 row-span-3'></Card>

          {/* Featured Project Card - Wide */}
          <Card layout='col-span-8 row-span-2'>
            <SpotifyTopTrack timeRange="medium_term" />
          </Card>

          {/* Contact CTA Card */}
          <Card layout='col-span-4 row-span-2'>
            <div className="h-full flex flex-col justify-center items-center text-center">
              <EnvelopeIcon className="w-8 h-8 text-white mb-3 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-lg font-bold mb-2">Let's Connect</h3>
              <button className="px-4 py-2 bg-white text-black rounded-full hover:bg-gray-200 transition-all duration-300 text-sm font-medium group-hover:scale-105 transform">
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
