import PathDetailView from "@/features/paths/components/PathDetailView";

export default function PathPage({ params }: { params: { id: string } }) {
  return <PathDetailView id={params.id} />;
}
