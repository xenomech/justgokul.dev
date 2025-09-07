'use client';

import { Zap, PlaneTakeoff } from 'lucide-react';
import { BarcodeIcon } from '../../../atoms/icons';

export interface Airport {
  code?: string;
  city?: string;
  location?: string;
  time?: string;
}

export interface Passenger {
  name: string;
  seat: string;
}

export interface Flight {
  number: string;
  gate: string;
  boardingTime: string;
}

export interface Airline {
  name: string;
  iconName?: string;
}

export interface TicketCardConfig {
  ticketColor: string;
  airline: Airline;
  departure: Airport;
  arrival: Airport;
  passenger: Passenger;
  flight: Flight;
}

export interface TicketCardProps extends TicketCardConfig {
  className?: string;
  onClick?: () => void;
}

export const TICKET_CARD_DEFAULTS = {
  airline: {
    name: 'Express',
    iconName: 'Zap',
  },
  flight: {
    number: 'X3-65C3',
    gate: '11B',
    boardingTime: '8:25PM ON AUGUST 2013',
  },
} as const;

function TicketPass({
  airline,
  departure,
  arrival,
  passenger,
  flight,
  ticketColor,
}: TicketCardProps) {
  return (
    <div
      className="flex h-full flex-col rounded-l-lg md:rounded-lg lg:rounded-l-lg"
      style={{ backgroundColor: ticketColor, borderColor: '#E89F3D' }}
    >
      <div className="flex h-1/6 items-center justify-between p-2">
        <span className="flex items-center gap-2 text-lg font-bold text-blue-900 md:text-xl">
          <Zap className="size-4 fill-blue-900 md:size-5" />
          <span className="text-lg font-bold text-blue-900 md:text-xl">{airline.name}</span>
        </span>
        <span className="text-sm text-white/60 md:text-lg">Boarding pass</span>
      </div>

      <div className="flex h-4/6 w-full flex-col bg-gray-200">
        <div className="flex items-center justify-center gap-4 px-2 py-2 md:gap-6 md:px-4">
          <span className="text-xl font-bold text-gray-800 md:text-2xl">
            {departure.code || departure.location}
          </span>
          <PlaneTakeoff size={32} className="fill-black text-black md:h-10 md:w-10" />
          <span className="text-xl font-bold text-gray-800 md:text-2xl">
            {arrival.code || arrival.location}
          </span>
        </div>

        <div className="flex h-full w-full flex-col gap-1 bg-gray-300 md:gap-2">
          <div className="flex flex-col justify-between gap-1 px-2 py-1 md:flex-row md:gap-0 md:px-4 md:py-2">
            <div className="text-xs text-gray-600 md:text-sm">
              PASSENGER NAME
              <br />
              <span className="md:text-md text-sm font-semibold text-gray-800">
                {passenger.name}
              </span>
            </div>
            <div className="text-xs text-gray-600 md:text-sm">
              FLIGHT N&deg;
              <br />
              <span className="md:text-md text-sm font-semibold text-gray-800">
                {flight.number}
              </span>
            </div>
            <div className="text-xs text-gray-600 md:text-sm">
              GATE
              <br />
              <span className="md:text-md text-sm font-semibold text-gray-800">{flight.gate}</span>
            </div>
          </div>

          <div className="flex flex-col justify-between gap-1 px-2 md:flex-row md:gap-0 md:px-4">
            <div className="text-xs text-gray-600 md:text-sm">
              SEAT
              <br />
              <span className="md:text-md text-sm font-semibold text-gray-800">
                {passenger.seat}
              </span>
            </div>
            <div className="text-xs text-gray-600 md:text-sm">
              BOARDING TIME
              <br />
              <span className="md:text-md text-sm font-semibold text-gray-800">
                {flight.boardingTime}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="relative h-1/6 w-full">
        <BarcodeIcon
          fill={ticketColor}
          className="absolute left-1/3 top-1/2 h-full w-32 -translate-y-1/2 transform md:w-40"
        />
      </div>
    </div>
  );
}

function TicketSlip({
  airline,
  departure,
  arrival,
  passenger,
  flight,
  ticketColor,
}: TicketCardProps) {
  return (
    <div
      className="flex h-full w-full flex-col rounded-lg"
      style={{ backgroundColor: ticketColor, borderColor: '#E89F3D' }}
    >
      <div className="flex h-1/6 items-center justify-center p-2">
        <span className="flex items-center gap-2 text-lg font-bold text-blue-900 md:text-xl">
          <Zap className="size-4 fill-blue-900 md:size-5" />
          <span className="text-lg font-bold text-blue-900 md:text-xl">{airline.name}</span>
        </span>
      </div>

      <div className="flex h-4/6 w-full flex-col bg-gray-200">
        <div className="flex items-center justify-between px-2 py-2 md:px-4">
          <span className="text-lg font-bold text-gray-800 md:text-2xl">
            {departure.code || departure.location}
          </span>
          <PlaneTakeoff size={28} className="fill-black text-black md:h-10 md:w-10" />
          <span className="text-lg font-bold text-gray-800 md:text-2xl">
            {arrival.code || arrival.location}
          </span>
        </div>

        <div className="flex h-full w-full flex-col justify-center gap-2 bg-gray-300 p-2 md:p-4">
          <div className="flex justify-between gap-2 md:gap-0">
            <div className="text-xs text-gray-600">
              FLIGHT N&deg;
              <br />
              <span className="text-sm font-semibold text-gray-800">{flight.number}</span>
            </div>
            <div className="text-xs text-gray-600">
              SEAT
              <br />
              <span className="text-sm font-semibold text-gray-800">{passenger.seat}</span>
            </div>
          </div>

          <div className="flex justify-start">
            <div className="text-xs text-gray-600">
              PASSENGER NAME
              <br />
              <span className="text-sm font-semibold text-gray-800">{passenger.name}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="relative h-1/6 w-full">
        <BarcodeIcon
          fill={ticketColor}
          className="absolute left-1/3 top-1/2 h-full w-24 -translate-y-1/2 transform md:w-40"
        />
      </div>
    </div>
  );
}

export const defaultTicketData: TicketCardProps = {
  ticketColor: '#FFB300',
  airline: {
    name: TICKET_CARD_DEFAULTS.airline.name,
    iconName: TICKET_CARD_DEFAULTS.airline.iconName,
  },
  departure: {
    code: 'JFK',
    city: 'New York',
  },
  arrival: {
    code: 'SFO',
    city: 'San Francisco',
  },
  passenger: {
    name: 'Rex, Anonasaurus',
    seat: '45A',
  },
  flight: TICKET_CARD_DEFAULTS.flight,
};

export default function TicketCard(props: TicketCardProps = defaultTicketData) {
  const ticketData = { ...defaultTicketData, ...props };

  return (
    <div
      className={`relative ${props.className || ''} ${props.onClick ? 'cursor-pointer' : ''}`}
      onClick={props.onClick}
    >
      <div className="block md:hidden">
        <div className="h-[250px] w-[200px]">
          <TicketSlip {...ticketData} />
        </div>
      </div>

      <div className="hidden md:block lg:hidden">
        <div className="h-[250px] w-[400px]">
          <TicketPass {...ticketData} />
        </div>
      </div>

      <div className="hidden h-[250px] w-[600px] lg:flex">
        <div className="w-[350px]">
          <TicketPass {...ticketData} />
        </div>

        <div className="w-[225px]">
          <TicketSlip {...ticketData} />
        </div>
      </div>
    </div>
  );
}
