export interface Bungalov {
    id: number;
    name: string;
    description: string;
    price: number;
    images: string[];
    videos: string[];
    amenities: string[];
    location: string;
}

export interface Booking {
    id: number;
    bungalovId: number;
    startDate: Date;
    endDate: Date;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    totalPrice: number;
    status: 'pending' | 'confirmed' | 'cancelled';
}

export interface DateRange {
    startDate: Date;
    endDate: Date;
}
