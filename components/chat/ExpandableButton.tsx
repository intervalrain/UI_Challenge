'use client';

import React, { useState, useRef, useEffect } from 'react'
import { LucideIcon } from 'lucide-react'

type IconComponent = React.ComponentType<{ size?: number }>

interface ExpandableButtonProps {
  Icon: LucideIcon | IconComponent
  text: string
  onClick?: () => void
  options?: string[]
  onOptionSelect?: (option: string) => void
}

const ExpandableButton: React.FC<ExpandableButtonProps> = ({ Icon, text, onClick, options, onOptionSelect }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleClick = () => {
    if (options) {
      setIsOpen(!isOpen)
    } else if (onClick) {
      onClick()
    }
  }

  const isLucideIcon = (icon: LucideIcon | IconComponent): icon is LucideIcon =>
    typeof icon === 'function' && 'displayName' in icon

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className={`px-2 py-2 text-gray-800 bg-blue-50 hover:bg-blue-200 text-sm font-semibold rounded-xl transition-all duration-200 ease-in-out flex items-center ${isHovered ? 'pr-4' : ''}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleClick}
      >
        {isLucideIcon(Icon) ? <Icon size={20} /> : <Icon size={20} />}
        {(isHovered || isOpen) && (
          <span className="ml-2 whitespace-nowrap overflow-hidden text-ellipsis">
            {text}
          </span>
        )}
      </button>
      {isOpen && options && (
        <div className="absolute bottom-full left-0 mb-1 w-auto bg-white border border-gray-200 rounded shadow-lg">
          <ul className="py-1">
            {options.map((option, index) => (
              <li key={index}>
                <a
                  href="#"
                  className="block mx-1 px-2 py-1 round-lg font-base text-sm text-gray-800 hover:bg-gray-100"
                  onClick={(e) => {
                    e.preventDefault();
                    console.log(`Selected: ${option}`);
                    setIsOpen(false);
                  }}
                >
                  {option}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default ExpandableButton