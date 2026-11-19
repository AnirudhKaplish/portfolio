
import { useState, useEffect } from 'react';
import { collection, doc, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { PROJECTS, SKILLS, TIMELINE, ROADMAP, PHILOSOPHY, BLOG_POSTS, PROFILE, SKILLS_CATEGORIES } from './data/portfolio';

// Generic Hook Factory for Collections
function useCollectionData(collectionName: string, fallbackData: any[]) {
    const [data, setData] = useState<any[]>(fallbackData);
    const [loading, setLoading] = useState(true);
    const [isFallback, setIsFallback] = useState(true);

    useEffect(() => {
        const q = query(collection(db, collectionName), orderBy('order', 'asc'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const items: any[] = [];
            snapshot.forEach((doc) => {
                items.push({ id: doc.id, ...doc.data() });
            });
            // If DB is empty (first load before sync?), keep fallback, else use DB
            if (items.length > 0) {
                 setData(items);
                 setIsFallback(false);
            } else {
                setIsFallback(true);
            }
            setLoading(false);
        }, (error) => {
            console.error(`Error fetching ${collectionName}:`, error);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [collectionName]);

    return { data, loading, isFallback };
}

// Specific Hooks
// Projects, timeline, roadmap and writings are maintained in src/hooks/data/portfolio.ts
// (the single source of truth); Firestore is not read for them.
const useLocalData = (fallbackData: any[]): { data: any[]; loading: boolean; isFallback: boolean } => ({ data: fallbackData, loading: false, isFallback: true });

export const useProjects = () => useLocalData(PROJECTS);

// Skills might need custom sorting if not done in DB
export const useSkills = () => useCollectionData('skills', SKILLS);
export const useSkillCategories = () => useCollectionData('skill_categories', SKILLS_CATEGORIES);

// Timeline needs sorting by Date usually, but for now we trust the DB order or sort client side
export const useTimeline = () => {
    const { data, loading, isFallback } = useLocalData(TIMELINE);
    // Optional: Sort by date descending?
    return { data, loading, isFallback };
};

export const useRoadmap = () => useLocalData(ROADMAP);
export const usePhilosophy = () => useCollectionData('philosophy', PHILOSOPHY);
export const useBlogPosts = () => useLocalData(BLOG_POSTS);

// Profile is a Single Document
export const useProfile = () => {
    const [profile, setProfile] = useState<any>(PROFILE);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsub = onSnapshot(doc(db, "portfolio", "profile"), (doc) => {
            if (doc.exists()) {
                // Keep headline, bio and stats in sync with the repo; take the rest (e.g. social links) from the database
                setProfile({ ...doc.data(), title: PROFILE.title, titles: PROFILE.titles, bio: PROFILE.bio, about: PROFILE.about, stats: PROFILE.stats });
            }
            setLoading(false);
        }, (error) => {
            console.error("Error fetching profile:", error);
            setLoading(false);
        });

        return () => unsub();
    }, []);

    return { profile, loading };
};
