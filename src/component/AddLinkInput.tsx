function AddLinkInput() {
  return (
    <div className="relative flex justify-center pt-[60px] pb-[90px] px-[300px] bg-[#F0F6FF]">
      <input
        placeholder="링크를 추가해 보세요."
        className="w-full px-5 py-4 border border-[#6D6AFE] rounded-md"
      />
      <button className="absolute right-[310px] top-[70px] px-4 py-2 w-[100px] bg-gradient-to-r from-[#6D6AFE] to-[#6AE3FE] rounded-md text-[#F5F5F5] text-[14px]">
        추가하기
      </button>
    </div>
  );
}

export default AddLinkInput;
