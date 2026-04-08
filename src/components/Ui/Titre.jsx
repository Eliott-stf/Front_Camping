export function Titre({ content, badge }) {
  return (
    <>
      {badge && (
        <span className="inline-block bg-plum-200 text-plum-900 text-xs font-medium px-3 py-1 rounded-full w-fit mb-4">
          {badge}
        </span>
      )}
      <h2 className="font-display text-3xl lg:text-4xl text-plum-950 mb-4 leading-tight">
        {content}
      </h2>
    </>
  );
}